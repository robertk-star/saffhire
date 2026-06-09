import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Loader2, Send } from "lucide-react";
import { trpc } from "@/lib/trpc";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";

type FormSection = 
  | "client-info"
  | "contact-info"
  | "business-address"
  | "billing-address"
  | "admin-users";

interface FormData {
  // Client Information
  companyName: string;
  dba: string;
  ein: string;
  businessType: string;
  ownerFirstName: string;
  ownerLastName: string;
  ownerPhone: string;
  ownerPhoneExt: string;
  ownerEmail: string;
  businessEntity: "LLC" | "Inc" | "PrivateCorp" | "Partnership" | "SoleProprietor" | "";

  // Contact Information
  hasMainContact: boolean;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  contactPhoneExt: string;
  contactMobile: string;

  // Business Address
  businessStreet: string;
  businessStreet2: string;
  businessCity: string;
  businessState: string;
  businessZip: string;
  businessCountry: string;

  // Billing Address
  sameAsBusiness: boolean;
  billingStreet: string;
  billingStreet2: string;
  billingCity: string;
  billingState: string;
  billingZip: string;
  billingCountry: string;
  billingAttention: string;

  // Admin Users
  adminUser1FirstName: string;
  adminUser1LastName: string;
  adminUser1JobTitle: string;
  adminUser1Mobile: string;
  adminUser1Email: string;

  adminUser2FirstName: string;
  adminUser2LastName: string;
  adminUser2JobTitle: string;
  adminUser2Mobile: string;
  adminUser2Email: string;

  adminUser3FirstName: string;
  adminUser3LastName: string;
  adminUser3JobTitle: string;
  adminUser3Mobile: string;
  adminUser3Email: string;
}

const INITIAL_FORM_DATA: FormData = {
  companyName: "",
  dba: "",
  ein: "",
  businessType: "",
  ownerFirstName: "",
  ownerLastName: "",
  ownerPhone: "",
  ownerPhoneExt: "",
  ownerEmail: "",
  businessEntity: "",
  hasMainContact: false,
  contactName: "",
  contactEmail: "",
  contactPhone: "",
  contactPhoneExt: "",
  contactMobile: "",
  businessStreet: "",
  businessStreet2: "",
  businessCity: "",
  businessState: "",
  businessZip: "",
  businessCountry: "United States",
  sameAsBusiness: true,
  billingStreet: "",
  billingStreet2: "",
  billingCity: "",
  billingState: "",
  billingZip: "",
  billingCountry: "United States",
  billingAttention: "",
  adminUser1FirstName: "",
  adminUser1LastName: "",
  adminUser1JobTitle: "",
  adminUser1Mobile: "",
  adminUser1Email: "",
  adminUser2FirstName: "",
  adminUser2LastName: "",
  adminUser2JobTitle: "",
  adminUser2Mobile: "",
  adminUser2Email: "",
  adminUser3FirstName: "",
  adminUser3LastName: "",
  adminUser3JobTitle: "",
  adminUser3Mobile: "",
  adminUser3Email: "",
};

const SECTION_ORDER: FormSection[] = [
  "client-info",
  "contact-info",
  "business-address",
  "billing-address",
  "admin-users",
];

interface ConversationMessage {
  role: "user" | "assistant";
  content: string;
}

interface NextQuestion {
  question: string;
  fieldName: string;
  fieldType: "text" | "email" | "phone" | "select" | "textarea";
  selectOptions?: string[];
  isRequired: boolean;
  helpText?: string;
}

export default function AccountSetup() {
  // Generate a persistent session ID for this form session
  const [sessionId] = useState(() => `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
  
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [currentSection, setCurrentSection] = useState<FormSection>("client-info");
  const [currentQuestion, setCurrentQuestion] = useState<NextQuestion | null>(null);
  const [userResponse, setUserResponse] = useState("");
  const [conversationHistory, setConversationHistory] = useState<ConversationMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<any>(null);
  const [progress, setProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // tRPC mutations and queries
  const getNextQuestionQuery = trpc.signup.getNextQuestion.useQuery(
    {
      section: currentSection,
      completedFields: getCompletedFieldsForSection(currentSection, formData),
      conversationHistory,
    },
    { enabled: false }
  );

  const validateResponseMutation = trpc.signup.validateResponse.useMutation();
  const submitIntakeMutation = trpc.signup.submitIntake.useMutation();

  // Direct browser-to-Google Sheets logging via Apps Script
  const APPS_SCRIPT_URL = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL || "";

  function logToGoogleSheets(data: Record<string, string>) {
    if (!APPS_SCRIPT_URL) return;
    // Use no-cors mode — browser posts directly to Google Apps Script
    // Response will be opaque but data will be written to the sheet
    fetch(APPS_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).catch(err => console.error("[Google Sheets] fetch error:", err));
  }

  // Auto-scroll to show latest message (new question)
  useEffect(() => {
    if (chatContainerRef.current) {
      // Scroll to bottom to show the latest message
      setTimeout(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      }, 0);
    }
  }, [conversationHistory]);

  // Auto-focus input field
  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  }, [currentQuestion]);

  // Load first question when section changes
  useEffect(() => {
    loadNextQuestion();
  }, [currentSection]);

  // Update progress
  useEffect(() => {
    const sectionIndex = SECTION_ORDER.indexOf(currentSection);
    const totalSections = SECTION_ORDER.length;
    setProgress(Math.round((sectionIndex / totalSections) * 100));
  }, [currentSection]);

  function getCompletedFieldsForSection(section: FormSection, data: FormData): Record<string, string> {
    const fields: Record<string, string> = {
      sessionId, // Always include session ID
    };

    switch (section) {
      case "client-info":
        if (data.companyName) fields.companyName = data.companyName;
        if (data.dba) fields.dba = data.dba;
        if (data.ein) fields.ein = data.ein;
        if (data.businessType) fields.businessType = data.businessType;
        if (data.ownerFirstName) fields.ownerFirstName = data.ownerFirstName;
        if (data.ownerLastName) fields.ownerLastName = data.ownerLastName;
        if (data.ownerPhone) fields.ownerPhone = data.ownerPhone;
        if (data.ownerEmail) fields.ownerEmail = data.ownerEmail;
        if (data.businessEntity) fields.businessEntity = data.businessEntity;
        break;

      case "contact-info":
        if (data.hasMainContact !== undefined) fields.hasMainContact = String(data.hasMainContact);
        if (data.contactName) fields.contactName = data.contactName;
        if (data.contactEmail) fields.contactEmail = data.contactEmail;
        if (data.contactPhone) fields.contactPhone = data.contactPhone;
        if (data.contactMobile) fields.contactMobile = data.contactMobile;
        break;

      case "business-address":
        if (data.businessStreet) fields.businessStreet = data.businessStreet;
        if (data.businessCity) fields.businessCity = data.businessCity;
        if (data.businessState) fields.businessState = data.businessState;
        if (data.businessZip) fields.businessZip = data.businessZip;
        break;

      case "billing-address":
        if (data.sameAsBusiness !== undefined) fields.sameAsBusiness = String(data.sameAsBusiness);
        if (data.billingStreet) fields.billingStreet = data.billingStreet;
        if (data.billingCity) fields.billingCity = data.billingCity;
        if (data.billingState) fields.billingState = data.billingState;
        break;

      case "admin-users":
        if (data.adminUser1FirstName) fields.adminUser1FirstName = data.adminUser1FirstName;
        if (data.adminUser1Email) fields.adminUser1Email = data.adminUser1Email;
        break;
    }

    return fields;
  }

  function getAllCompletedFields(data: FormData): Record<string, string> {
    const fields: Record<string, string> = {};
    
    // Client info
    if (data.companyName) fields.companyName = data.companyName;
    if (data.ein) fields.ein = data.ein;
    if (data.ownerFirstName) fields.ownerFirstName = data.ownerFirstName;
    if (data.ownerLastName) fields.ownerLastName = data.ownerLastName;
    if (data.ownerEmail) fields.ownerEmail = data.ownerEmail;
    if (data.businessStreet) fields.businessStreet = data.businessStreet;
    if (data.businessCity) fields.businessCity = data.businessCity;
    if (data.adminUser1Email) fields.adminUser1Email = data.adminUser1Email;
    
    return fields;
  }

  async function loadNextQuestion() {
    setIsLoading(true);
    try {
      const result = await getNextQuestionQuery.refetch();
      if (result.data && typeof result.data === 'object' && 'question' in result.data) {
        const questionData = result.data as NextQuestion;
        setCurrentQuestion(questionData);
        const questionText = questionData.question || "";
        setConversationHistory(prev => [
          ...prev,
          { role: "assistant", content: questionText }
        ]);
      } else if (currentSection === SECTION_ORDER[SECTION_ORDER.length - 1]) {
        // All sections complete, submit
        await submitForm();
      } else if (currentSection !== SECTION_ORDER[SECTION_ORDER.length - 1]) {
        // Move to next section
        const nextIndex = SECTION_ORDER.indexOf(currentSection) + 1;
        if (nextIndex < SECTION_ORDER.length) {
          setCurrentSection(SECTION_ORDER[nextIndex]);
        } else {
          // All sections complete, submit
          await submitForm();
        }
      }
    } catch (error) {
      console.error("Error loading question:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmitResponse(e: React.FormEvent) {
    e.preventDefault();
    if (!userResponse.trim() || !currentQuestion || isLoading) return;

    const userMsg = userResponse.trim();
    setUserResponse("");
    setConversationHistory(prev => [...prev, { role: "user", content: userMsg }]);
    setIsLoading(true);

    try {
      // Build all accumulated fields across ALL sections for Google Sheets logging
      const allFields: Record<string, string> = {
        sessionId,
        ...(formData.companyName ? { companyName: formData.companyName } : {}),
        ...(formData.dba ? { dba: formData.dba } : {}),
        ...(formData.ein ? { ein: formData.ein } : {}),
        ...(formData.businessType ? { businessType: formData.businessType } : {}),
        ...(formData.businessEntity ? { businessEntity: formData.businessEntity } : {}),
        ...(formData.ownerFirstName ? { ownerFirstName: formData.ownerFirstName } : {}),
        ...(formData.ownerLastName ? { ownerLastName: formData.ownerLastName } : {}),
        ...(formData.ownerPhone ? { ownerPhone: formData.ownerPhone } : {}),
        ...(formData.ownerPhoneExt ? { ownerPhoneExt: formData.ownerPhoneExt } : {}),
        ...(formData.ownerEmail ? { ownerEmail: formData.ownerEmail } : {}),
        ...(formData.hasMainContact !== undefined ? { hasMainContact: String(formData.hasMainContact) } : {}),
        ...(formData.contactName ? { contactName: formData.contactName } : {}),
        ...(formData.contactEmail ? { contactEmail: formData.contactEmail } : {}),
        ...(formData.contactPhone ? { contactPhone: formData.contactPhone } : {}),
        ...(formData.contactPhoneExt ? { contactPhoneExt: formData.contactPhoneExt } : {}),
        ...(formData.contactMobile ? { contactMobile: formData.contactMobile } : {}),
        ...(formData.businessStreet ? { businessStreet: formData.businessStreet } : {}),
        ...(formData.businessStreet2 ? { businessStreet2: formData.businessStreet2 } : {}),
        ...(formData.businessCity ? { businessCity: formData.businessCity } : {}),
        ...(formData.businessState ? { businessState: formData.businessState } : {}),
        ...(formData.businessZip ? { businessZip: formData.businessZip } : {}),
        ...(formData.businessCountry ? { businessCountry: formData.businessCountry } : {}),
        ...(formData.sameAsBusiness !== undefined ? { sameAsBusiness: String(formData.sameAsBusiness) } : {}),
        ...(formData.billingStreet ? { billingStreet: formData.billingStreet } : {}),
        ...(formData.billingStreet2 ? { billingStreet2: formData.billingStreet2 } : {}),
        ...(formData.billingCity ? { billingCity: formData.billingCity } : {}),
        ...(formData.billingState ? { billingState: formData.billingState } : {}),
        ...(formData.billingZip ? { billingZip: formData.billingZip } : {}),
        ...(formData.billingCountry ? { billingCountry: formData.billingCountry } : {}),
        ...(formData.billingAttention ? { billingAttention: formData.billingAttention } : {}),
        ...(formData.adminUser1FirstName ? { adminUser1FirstName: formData.adminUser1FirstName } : {}),
        ...(formData.adminUser1LastName ? { adminUser1LastName: formData.adminUser1LastName } : {}),
        ...(formData.adminUser1JobTitle ? { adminUser1JobTitle: formData.adminUser1JobTitle } : {}),
        ...(formData.adminUser1Mobile ? { adminUser1Mobile: formData.adminUser1Mobile } : {}),
        ...(formData.adminUser1Email ? { adminUser1Email: formData.adminUser1Email } : {}),
        ...(formData.adminUser2FirstName ? { adminUser2FirstName: formData.adminUser2FirstName } : {}),
        ...(formData.adminUser2LastName ? { adminUser2LastName: formData.adminUser2LastName } : {}),
        ...(formData.adminUser2JobTitle ? { adminUser2JobTitle: formData.adminUser2JobTitle } : {}),
        ...(formData.adminUser2Mobile ? { adminUser2Mobile: formData.adminUser2Mobile } : {}),
        ...(formData.adminUser2Email ? { adminUser2Email: formData.adminUser2Email } : {}),
        ...(formData.adminUser3FirstName ? { adminUser3FirstName: formData.adminUser3FirstName } : {}),
        ...(formData.adminUser3LastName ? { adminUser3LastName: formData.adminUser3LastName } : {}),
        ...(formData.adminUser3JobTitle ? { adminUser3JobTitle: formData.adminUser3JobTitle } : {}),
        ...(formData.adminUser3Mobile ? { adminUser3Mobile: formData.adminUser3Mobile } : {}),
        ...(formData.adminUser3Email ? { adminUser3Email: formData.adminUser3Email } : {}),
      };

      // Also include the current answer optimistically in allFields
      // (formData state hasn't updated yet since setFormData is async)
      const allFieldsWithCurrent: Record<string, string> = {
        ...allFields,
        [currentQuestion.fieldName]: userMsg,
      };

      // Validate and extract data
      const validation = await validateResponseMutation.mutateAsync({
        section: currentSection,
        fieldName: currentQuestion.fieldName,
        userResponse: userMsg,
        completedFields: allFieldsWithCurrent,
        conversationHistory: [...conversationHistory, { role: "user", content: userMsg }],
      });

      // Update form data with extracted value
      if (validation.shouldContinue && validation.normalizedValue) {
        const confirmedValue = validation.normalizedValue;
        const confirmedField = currentQuestion.fieldName;

        setFormData(prev => ({
          ...prev,
          [confirmedField]: confirmedValue,
        }));

        // Log directly from browser to Google Apps Script (no-cors)
        logToGoogleSheets({
          ...allFieldsWithCurrent,
          [confirmedField]: confirmedValue,
          sessionId,
          timestamp: new Date().toISOString(),
          status: "In Progress",
          sectionCompleted: currentSection,
        });

        // Add confirmation message
        setConversationHistory(prev => [
          ...prev,
          { role: "assistant", content: "Got it!" }
        ]);

        // Load next question after a short delay
        setTimeout(() => loadNextQuestion(), 500);
      } else if (validation.clarificationQuestion) {
        // Ask for clarification
        const clarifyMsg = validation.clarificationQuestion || "";
        setConversationHistory(prev => [
          ...prev,
          { role: "assistant", content: clarifyMsg }
        ]);
      }
    } catch (error) {
      console.error("Error validating response:", error);
      setConversationHistory(prev => [
        ...prev,
        { role: "assistant", content: "I had trouble understanding that. Could you try again?" }
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  async function submitForm() {
    setIsSubmitting(true);
    try {
      // Prepare admin users array
      const adminUsers = [];
      if (formData.adminUser1Email) {
        adminUsers.push({
          firstName: formData.adminUser1FirstName,
          lastName: formData.adminUser1LastName,
          jobTitle: formData.adminUser1JobTitle,
          mobile: formData.adminUser1Mobile,
          email: formData.adminUser1Email,
          isAdmin: true,
        });
      }
      if (formData.adminUser2Email) {
        adminUsers.push({
          firstName: formData.adminUser2FirstName,
          lastName: formData.adminUser2LastName,
          jobTitle: formData.adminUser2JobTitle,
          mobile: formData.adminUser2Mobile,
          email: formData.adminUser2Email,
          isAdmin: true,
        });
      }
      if (formData.adminUser3Email) {
        adminUsers.push({
          firstName: formData.adminUser3FirstName,
          lastName: formData.adminUser3LastName,
          jobTitle: formData.adminUser3JobTitle,
          mobile: formData.adminUser3Mobile,
          email: formData.adminUser3Email,
          isAdmin: true,
        });
      }

      const result = await submitIntakeMutation.mutateAsync({
        ...formData,
        businessEntity: (formData.businessEntity || "LLC") as any,
        adminUsers,
        signatureDate: "",
        signatureConfirmed: false,
        authorizedSignerName: "",
        authorizedSignerTitle: "",
      });

      setSubmissionResult(result);

      // Log final completed status to Google Sheets — this triggers the email notification
      logToGoogleSheets({
        sessionId,
        timestamp: new Date().toISOString(),
        status: "Completed",
        sectionCompleted: "admin-users",
        companyName: formData.companyName,
        dba: formData.dba,
        ein: formData.ein,
        businessType: formData.businessType,
        businessEntity: formData.businessEntity || "LLC",
        ownerFirstName: formData.ownerFirstName,
        ownerLastName: formData.ownerLastName,
        ownerPhone: formData.ownerPhone,
        ownerPhoneExt: formData.ownerPhoneExt,
        ownerEmail: formData.ownerEmail,
        hasMainContact: String(formData.hasMainContact),
        contactName: formData.contactName,
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone,
        contactPhoneExt: formData.contactPhoneExt,
        contactMobile: formData.contactMobile,
        businessStreet: formData.businessStreet,
        businessStreet2: formData.businessStreet2,
        businessCity: formData.businessCity,
        businessState: formData.businessState,
        businessZip: formData.businessZip,
        businessCountry: formData.businessCountry,
        sameAsBusiness: String(formData.sameAsBusiness),
        billingStreet: formData.billingStreet,
        billingStreet2: formData.billingStreet2,
        billingCity: formData.billingCity,
        billingState: formData.billingState,
        billingZip: formData.billingZip,
        billingCountry: formData.billingCountry,
        billingAttention: formData.billingAttention,
        adminUser1FirstName: formData.adminUser1FirstName,
        adminUser1LastName: formData.adminUser1LastName,
        adminUser1JobTitle: formData.adminUser1JobTitle,
        adminUser1Mobile: formData.adminUser1Mobile,
        adminUser1Email: formData.adminUser1Email,
        adminUser2FirstName: formData.adminUser2FirstName,
        adminUser2LastName: formData.adminUser2LastName,
        adminUser2JobTitle: formData.adminUser2JobTitle,
        adminUser2Mobile: formData.adminUser2Mobile,
        adminUser2Email: formData.adminUser2Email,
        adminUser3FirstName: formData.adminUser3FirstName,
        adminUser3LastName: formData.adminUser3LastName,
        adminUser3JobTitle: formData.adminUser3JobTitle,
        adminUser3Mobile: formData.adminUser3Mobile,
        adminUser3Email: formData.adminUser3Email,
      });

      setConversationHistory(prev => [
        ...prev,
        { role: "assistant", content: "Thank you for providing your information! You will be receiving an agreement to review and sign. In the meantime, we will get started on setting up your account." }
      ]);
    } catch (error) {
      console.error("Error submitting form:", error);
      setConversationHistory(prev => [
        ...prev,
        { role: "assistant", content: "I encountered an error submitting your information. Please try again." }
      ]);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submissionResult) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-12">
          <PageSEO 
            title="Account Setup Complete"
            description="Your intake has been submitted successfully"
            path="/test-signup"
          />
          <Card className="max-w-2xl mx-auto p-8 text-center">
            <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
            <p className="text-lg text-muted-foreground mb-6">
              Thank you for providing your information! You will be receiving an agreement to review and sign.
            </p>
            <p className="text-muted-foreground">
              In the meantime, we will get started on setting up your account.
            </p>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <PageSEO 
          title="Account Setup"
          description="Complete your account setup through our intelligent chat interface"
          path="/test-signup"
        />
        
        <div className="max-w-2xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-2xl font-bold">Account Setup</h1>
              <span className="text-sm text-muted-foreground">{progress}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Chat Messages */}
          <Card className="p-6 mb-6 h-96 overflow-y-auto bg-card" ref={chatContainerRef}>
            <div className="space-y-4">
              {conversationHistory.map((msg, idx) => (
                <div 
                  key={idx}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div 
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted text-foreground px-4 py-2 rounded-lg flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Claude is thinking...</span>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Input Form */}
          <form onSubmit={handleSubmitResponse} className="flex gap-2">
            <Input
              ref={inputRef}
              value={userResponse}
              onChange={(e) => setUserResponse(e.target.value)}
              placeholder="Type your answer..."
              disabled={isLoading || isSubmitting}
              className="flex-1"
            />
            <Button 
              type="submit" 
              disabled={isLoading || isSubmitting || !userResponse.trim()}
              size="icon"
            >
              {isLoading || isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
