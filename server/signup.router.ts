import { publicProcedure, router } from "./_core/trpc";
import { notifyOwner } from "./_core/notification";
import { getDb } from "./db";
import { signupIntakes } from "../drizzle/schema";
import { z } from "zod";
import {
  createOrUpdateContact,
  addTagsToContact,
  createOpportunity,
  triggerAgreementWorkflow,
} from "./_core/gohighlevel";
import {
  generateNextQuestion,
  analyzeResponse,
  generateSummary,
  type QuestionnaireState,
} from "./_core/claudeQuestionnaire";
import { logIntakeToSheet, updateIntakeStatus, initializeSheet } from "./_core/googleSheets";

// Validation schemas
const phoneRegex = /^(\+1)?[-.\s]?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const einRegex = /^\d{2}-\d{7}$/;

const phoneSchema = z.string().regex(phoneRegex, "Invalid phone number format");
const emailSchema = z.string().email("Invalid email format");
const einSchema = z.string().regex(einRegex, "EIN must be in XX-XXXXXXX format");

// Admin User schema
const adminUserSchema = z.object({
  firstName: z.string().min(1, "First name required"),
  lastName: z.string().min(1, "Last name required"),
  jobTitle: z.string().min(1, "Job title required"),
  mobile: z.string().min(1, "Mobile required"),
  email: emailSchema,
  isAdmin: z.boolean().default(true),
});

// Full signup intake schema
const signupIntakeSchema = z.object({
  // Client Information
  companyName: z.string().min(1, "Company name required"),
  dba: z.string().optional(),
  ein: z.string().min(1, "EIN required"),
  businessType: z.string().optional(),
  businessEntity: z.enum(["LLC", "Inc", "PrivateCorp", "Partnership", "SoleProprietor"]),
  ownerFirstName: z.string().min(1, "Owner first name required"),
  ownerLastName: z.string().min(1, "Owner last name required"),
  ownerPhone: z.string().min(1, "Owner phone required"),
  ownerPhoneExt: z.string().optional(),
  ownerEmail: emailSchema,

  // Contact Information
  hasMainContact: z.boolean(),
  contactName: z.string().optional(),
  contactEmail: emailSchema.optional(),
  contactPhone: z.string().optional(),
  contactPhoneExt: z.string().optional(),
  contactMobile: z.string().optional(),

  // Business Address
  businessStreet: z.string().min(1, "Street address required"),
  businessStreet2: z.string().optional(),
  businessCity: z.string().min(1, "City required"),
  businessState: z.string().min(1, "State required"),
  businessZip: z.string().min(1, "Zip code required"),
  businessCountry: z.string().default("United States"),

  // Billing Address
  sameAsBusiness: z.boolean(),
  billingStreet: z.string().optional(),
  billingStreet2: z.string().optional(),
  billingCity: z.string().optional(),
  billingState: z.string().optional(),
  billingZip: z.string().optional(),
  billingCountry: z.string().optional(),
  billingAttention: z.string().optional(),

  // Admin Users
  adminUsers: z.array(adminUserSchema).min(1, "At least one admin user required"),

  // Authorized Signer (optional - collected separately via agreement)
  authorizedSignerName: z.string().optional().default(""),
  authorizedSignerTitle: z.string().optional().default(""),
  signatureDate: z.string().optional(),
  signatureConfirmed: z.boolean().default(false),
});

async function setupGoHighLevelWorkflow(
  contactId: string,
  companyName: string
): Promise<{ opportunityId: string }> {
  try {
    // Add tags to contact
    await addTagsToContact(contactId, ["New Client Intake", "Agreement Needed"]);

    // Create opportunity
    const opportunityResult = await createOpportunity({
      contactId,
      companyName,
    });

    // Trigger agreement workflow
    await triggerAgreementWorkflow(contactId);

    return opportunityResult;
  } catch (error) {
    console.error("[Signup] GoHighLevel workflow setup failed:", error);
    throw error;
  }
}

export const signupRouter = router({
  getNextQuestion: publicProcedure
    .input(
      z.object({
        section: z.string(),
        completedFields: z.record(z.string(), z.string()),
        conversationHistory: z.array(
          z.object({
            role: z.enum(["user", "assistant"]),
            content: z.string(),
          })
        ),
      })
    )
    .query(async ({ input }) => {
      try {
        const state: QuestionnaireState = {
          section: input.section,
          completedFields: input.completedFields as Record<string, string>,
          conversationHistory: input.conversationHistory,
        };

        const nextQuestion = await generateNextQuestion(state);
        return nextQuestion;
      } catch (error) {
        console.error("[Claude] Question generation failed:", error);
        throw new Error(
          "Failed to generate next question. Please try again."
        );
      }
    }),

  validateResponse: publicProcedure
    .input(
      z.object({
        fieldName: z.string(),
        userResponse: z.string(),
        section: z.string(),
        completedFields: z.record(z.string(), z.string()),
        conversationHistory: z.array(
          z.object({
            role: z.enum(["user", "assistant"]),
            content: z.string(),
          })
        ),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const state: QuestionnaireState = {
          section: input.section,
          completedFields: input.completedFields as Record<string, string>,
          conversationHistory: input.conversationHistory,
        };

        const validation = await analyzeResponse(
          state,
          input.userResponse,
          input.fieldName
        );

        // Log accumulated data to Google Sheets in real-time
        if (validation.shouldContinue) {
          try {
            const sessionId = input.completedFields.sessionId;
            if (sessionId) {
              // Merge completed fields with newly extracted data
              const accumulatedData = {
                ...input.completedFields,
                ...validation.extractedData,
              };
              
              console.log("[Google Sheets] Logging accumulated data:", { sessionId, keys: Object.keys(accumulatedData) });
              
              // Build the data object for Google Sheets
              const sheetData: Record<string, string> = {
                timestamp: new Date().toISOString(),
                sessionId,
                companyName: accumulatedData.companyName || "",
                dba: accumulatedData.dba || "",
                ein: accumulatedData.ein || "",
                businessType: accumulatedData.businessType || "",
                businessEntity: accumulatedData.businessEntity || "",
                ownerFirstName: accumulatedData.ownerFirstName || "",
                ownerLastName: accumulatedData.ownerLastName || "",
                ownerPhone: accumulatedData.ownerPhone || "",
                ownerPhoneExt: accumulatedData.ownerPhoneExt || "",
                ownerEmail: accumulatedData.ownerEmail || "",
                hasMainContact: accumulatedData.hasMainContact || "",
                contactName: accumulatedData.contactName || "",
                contactEmail: accumulatedData.contactEmail || "",
                contactPhone: accumulatedData.contactPhone || "",
                contactPhoneExt: accumulatedData.contactPhoneExt || "",
                contactMobile: accumulatedData.contactMobile || "",
                businessStreet: accumulatedData.businessStreet || "",
                businessStreet2: accumulatedData.businessStreet2 || "",
                businessCity: accumulatedData.businessCity || "",
                businessState: accumulatedData.businessState || "",
                businessZip: accumulatedData.businessZip || "",
                businessCountry: accumulatedData.businessCountry || "",
                sameAsBusiness: accumulatedData.sameAsBusiness || "",
                billingStreet: accumulatedData.billingStreet || "",
                billingStreet2: accumulatedData.billingStreet2 || "",
                billingCity: accumulatedData.billingCity || "",
                billingState: accumulatedData.billingState || "",
                billingZip: accumulatedData.billingZip || "",
                billingCountry: accumulatedData.billingCountry || "",
                billingAttention: accumulatedData.billingAttention || "",
                adminUser1FirstName: accumulatedData.adminUser1FirstName || "",
                adminUser1LastName: accumulatedData.adminUser1LastName || "",
                adminUser1JobTitle: accumulatedData.adminUser1JobTitle || "",
                adminUser1Mobile: accumulatedData.adminUser1Mobile || "",
                adminUser1Email: accumulatedData.adminUser1Email || "",
                adminUser2FirstName: accumulatedData.adminUser2FirstName || "",
                adminUser2LastName: accumulatedData.adminUser2LastName || "",
                adminUser2JobTitle: accumulatedData.adminUser2JobTitle || "",
                adminUser2Mobile: accumulatedData.adminUser2Mobile || "",
                adminUser2Email: accumulatedData.adminUser2Email || "",
                adminUser3FirstName: accumulatedData.adminUser3FirstName || "",
                adminUser3LastName: accumulatedData.adminUser3LastName || "",
                adminUser3JobTitle: accumulatedData.adminUser3JobTitle || "",
                adminUser3Mobile: accumulatedData.adminUser3Mobile || "",
                adminUser3Email: accumulatedData.adminUser3Email || "",
                status: "In Progress",
                sectionCompleted: input.section,
              };
              
              await logIntakeToSheet(sheetData);
            }
          } catch (sheetError) {
            console.error("[Google Sheets] Failed to log response:", sheetError);
            // Don't throw - we don't want to fail the validation if sheets logging fails
          }
        }

        return validation;
      } catch (error) {
        console.error("[Claude] Response validation failed:", error);
        throw new Error("Failed to validate response. Please try again.");
      }
    }),

  logField: publicProcedure
    .input(
      z.object({
        sessionId: z.string(),
        fieldName: z.string(),
        fieldValue: z.string(),
        allFields: z.record(z.string(), z.string()).optional(),
        section: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        console.log(`[Google Sheets] logField called: sessionId=${input.sessionId}, field=${input.fieldName}, value=${input.fieldValue}`);
        
        // Build the full data object from allFields + the current field
        const sheetData: Record<string, string> = {
          timestamp: new Date().toISOString(),
          sessionId: input.sessionId,
          ...(input.allFields || {}),
          [input.fieldName]: input.fieldValue,
          status: "In Progress",
          sectionCompleted: input.section || "",
        };
        
        console.log(`[Google Sheets] Writing fields to sheet:`, Object.keys(sheetData).filter(k => sheetData[k]));
        await logIntakeToSheet(sheetData);
        return { success: true };
      } catch (error) {
        console.error("[Google Sheets] logField failed:", error);
        return { success: false };
      }
    }),

  generateSummaryReport: publicProcedure
    .input(
      z.object({
        completedFields: z.record(z.string(), z.string()),
      })
    )
    .query(async ({ input }) => {
      try {
        const summary = await generateSummary(input.completedFields as Record<string, string>);
        return { summary };
      } catch (error) {
        console.error("[Claude] Summary generation failed:", error);
        throw new Error("Failed to generate summary. Please try again.");
      }
    }),

  submitIntake: publicProcedure
    .input(signupIntakeSchema)
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");

      const sessionId = `signup_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Validate conditional fields
      if (input.hasMainContact) {
        if (!input.contactName || !input.contactEmail || !input.contactPhone) {
          throw new Error("Contact information is incomplete");
        }
      }

      if (!input.sameAsBusiness) {
        if (
          !input.billingStreet ||
          !input.billingCity ||
          !input.billingState ||
          !input.billingZip
        ) {
          throw new Error("Billing address is incomplete");
        }
      }

      // Prepare billing address (copy from business if same)
      const billingData = input.sameAsBusiness
        ? {
            billingStreet: input.businessStreet,
            billingStreet2: input.businessStreet2 || null,
            billingCity: input.businessCity,
            billingState: input.businessState,
            billingZip: input.businessZip,
            billingCountry: input.businessCountry,
            billingAttention: null,
          }
        : {
            billingStreet: input.billingStreet || null,
            billingStreet2: input.billingStreet2 || null,
            billingCity: input.billingCity || null,
            billingState: input.billingState || null,
            billingZip: input.billingZip || null,
            billingCountry: input.billingCountry || null,
            billingAttention: input.billingAttention || null,
          };

      try {
        // Initialize Google Sheet on first run
        await initializeSheet();

        // Log to Google Sheets immediately (before any other processing)
        await logIntakeToSheet({
          timestamp: new Date().toISOString(),
          sessionId,
          companyName: input.companyName,
          dba: input.dba || "",
          ein: input.ein,
          businessType: input.businessType || "",
          businessEntity: input.businessEntity,
          ownerFirstName: input.ownerFirstName,
          ownerLastName: input.ownerLastName,
          ownerPhone: input.ownerPhone,
          ownerPhoneExt: input.ownerPhoneExt || "",
          ownerEmail: input.ownerEmail,
          hasMainContact: String(input.hasMainContact),
          contactName: input.contactName || "",
          contactEmail: input.contactEmail || "",
          contactPhone: input.contactPhone || "",
          contactPhoneExt: input.contactPhoneExt || "",
          contactMobile: input.contactMobile || "",
          businessStreet: input.businessStreet,
          businessStreet2: input.businessStreet2 || "",
          businessCity: input.businessCity,
          businessState: input.businessState,
          businessZip: input.businessZip,
          businessCountry: input.businessCountry,
          sameAsBusiness: String(input.sameAsBusiness),
          billingStreet: input.billingStreet || "",
          billingStreet2: input.billingStreet2 || "",
          billingCity: input.billingCity || "",
          billingState: input.billingState || "",
          billingZip: input.billingZip || "",
          billingCountry: input.billingCountry || "",
          billingAttention: input.billingAttention || "",
          adminUser1FirstName: input.adminUsers[0]?.firstName || "",
          adminUser1LastName: input.adminUsers[0]?.lastName || "",
          adminUser1JobTitle: input.adminUsers[0]?.jobTitle || "",
          adminUser1Mobile: input.adminUsers[0]?.mobile || "",
          adminUser1Email: input.adminUsers[0]?.email || "",
          adminUser2FirstName: input.adminUsers[1]?.firstName || "",
          adminUser2LastName: input.adminUsers[1]?.lastName || "",
          adminUser2JobTitle: input.adminUsers[1]?.jobTitle || "",
          adminUser2Mobile: input.adminUsers[1]?.mobile || "",
          adminUser2Email: input.adminUsers[1]?.email || "",
          adminUser3FirstName: input.adminUsers[2]?.firstName || "",
          adminUser3LastName: input.adminUsers[2]?.lastName || "",
          adminUser3JobTitle: input.adminUsers[2]?.jobTitle || "",
          adminUser3Mobile: input.adminUsers[2]?.mobile || "",
          adminUser3Email: input.adminUsers[2]?.email || "",
          authorizedSignerName: input.authorizedSignerName,
          authorizedSignerTitle: input.authorizedSignerTitle,
          signatureDate: input.signatureDate || "",
          signatureConfirmed: String(input.signatureConfirmed),
          status: "Completed",
          sectionCompleted: "authorized-signer",
          goHighLevelContactId: "",
        });

        // Create or update GoHighLevel contact
        const contactResult = await createOrUpdateContact({
          firstName: input.ownerFirstName,
          lastName: input.ownerLastName,
          email: input.ownerEmail,
          phone: input.ownerPhone,
          companyName: input.companyName,
          additionalNotes: `DBA: ${input.dba || "N/A"}, Business Type: ${input.businessType || "N/A"}`,
        });
        const ghlResult = { contactId: contactResult.contactId };

        // Setup GoHighLevel workflow (tags, opportunity, etc.)
        const workflowResult = await setupGoHighLevelWorkflow(
          ghlResult.contactId,
          input.companyName
        );

        // Save to database
        await db.insert(signupIntakes).values({
          sessionId,
          companyName: input.companyName,
          dba: input.dba || null,
          ein: input.ein,
          businessType: input.businessType || null,
          businessEntity: input.businessEntity,
          ownerFirstName: input.ownerFirstName,
          ownerLastName: input.ownerLastName,
          ownerPhone: input.ownerPhone,
          ownerPhoneExt: input.ownerPhoneExt || null,
          ownerEmail: input.ownerEmail,
          hasMainContact: input.hasMainContact,
          contactName: input.contactName || null,
          contactEmail: input.contactEmail || null,
          contactPhone: input.contactPhone || null,
          contactPhoneExt: input.contactPhoneExt || null,
          contactMobile: input.contactMobile || null,
          businessStreet: input.businessStreet,
          businessStreet2: input.businessStreet2 || null,
          businessCity: input.businessCity,
          businessState: input.businessState,
          businessZip: input.businessZip,
          businessCountry: input.businessCountry,
          sameAsBusiness: input.sameAsBusiness,
          ...billingData,
          adminUsers: JSON.stringify(input.adminUsers),
          authorizedSignerName: input.authorizedSignerName,
          authorizedSignerTitle: input.authorizedSignerTitle,
          signatureDate: input.signatureDate ? new Date(input.signatureDate) : null,
          signatureConfirmed: input.signatureConfirmed,
          goHighLevelContactId: ghlResult.contactId,
          goHighLevelOpportunityId: workflowResult.opportunityId,
          agreementStatus: "Pending",
          status: "Completed",
        });

        // Send notification to Robert with all filled fields
        const filledFields: string[] = [];
        
        // Client Information
        filledFields.push("=== CLIENT INFORMATION ===");
        if (input.companyName) filledFields.push(`Company: ${input.companyName}`);
        if (input.dba) filledFields.push(`DBA: ${input.dba}`);
        if (input.ein) filledFields.push(`EIN: ${input.ein}`);
        if (input.businessType) filledFields.push(`Business Type: ${input.businessType}`);
        if (input.businessEntity) filledFields.push(`Business Entity: ${input.businessEntity}`);
        if (input.ownerFirstName || input.ownerLastName) filledFields.push(`Owner: ${input.ownerFirstName} ${input.ownerLastName}`);
        if (input.ownerPhone) filledFields.push(`Owner Phone: ${input.ownerPhone}`);
        if (input.ownerPhoneExt) filledFields.push(`Owner Phone Ext: ${input.ownerPhoneExt}`);
        if (input.ownerEmail) filledFields.push(`Owner Email: ${input.ownerEmail}`);
        
        // Contact Information
        if (input.hasMainContact) {
          filledFields.push("\n=== CONTACT INFORMATION ===");
          if (input.contactName) filledFields.push(`Contact Name: ${input.contactName}`);
          if (input.contactEmail) filledFields.push(`Contact Email: ${input.contactEmail}`);
          if (input.contactPhone) filledFields.push(`Contact Phone: ${input.contactPhone}`);
          if (input.contactPhoneExt) filledFields.push(`Contact Phone Ext: ${input.contactPhoneExt}`);
          if (input.contactMobile) filledFields.push(`Contact Mobile: ${input.contactMobile}`);
        }
        
        // Business Address
        filledFields.push("\n=== BUSINESS ADDRESS ===");
        if (input.businessStreet) filledFields.push(`Street: ${input.businessStreet}${input.businessStreet2 ? " " + input.businessStreet2 : ""}`);
        if (input.businessCity) filledFields.push(`City: ${input.businessCity}`);
        if (input.businessState) filledFields.push(`State: ${input.businessState}`);
        if (input.businessZip) filledFields.push(`Zip: ${input.businessZip}`);
        if (input.businessCountry) filledFields.push(`Country: ${input.businessCountry}`);
        
        // Billing Address
        if (!input.sameAsBusiness) {
          filledFields.push("\n=== BILLING ADDRESS ===");
          if (input.billingStreet) filledFields.push(`Street: ${input.billingStreet}${input.billingStreet2 ? " " + input.billingStreet2 : ""}`);
          if (input.billingCity) filledFields.push(`City: ${input.billingCity}`);
          if (input.billingState) filledFields.push(`State: ${input.billingState}`);
          if (input.billingZip) filledFields.push(`Zip: ${input.billingZip}`);
          if (input.billingCountry) filledFields.push(`Country: ${input.billingCountry}`);
          if (input.billingAttention) filledFields.push(`Attention: ${input.billingAttention}`);
        }
        
        // Admin Users
        filledFields.push("\n=== ADMIN USERS ===");
        input.adminUsers.forEach((user, idx) => {
          const userNum = idx + 1;
          filledFields.push(`\nAdmin User ${userNum}:`);
          if (user.firstName || user.lastName) filledFields.push(`  Name: ${user.firstName} ${user.lastName}`);
          if (user.jobTitle) filledFields.push(`  Job Title: ${user.jobTitle}`);
          if (user.mobile) filledFields.push(`  Mobile: ${user.mobile}`);
          if (user.email) filledFields.push(`  Email: ${user.email}`);
        });
        
        // Authorized Signer
        filledFields.push("\n=== AUTHORIZED SIGNER ===");
        if (input.authorizedSignerName) filledFields.push(`Name: ${input.authorizedSignerName}`);
        if (input.authorizedSignerTitle) filledFields.push(`Title: ${input.authorizedSignerTitle}`);
        if (input.signatureDate) filledFields.push(`Date: ${input.signatureDate}`);
        if (input.signatureConfirmed) filledFields.push(`Signature Confirmed: Yes`);
        
        // Add tracking info
        filledFields.push("\n=== TRACKING INFO ===");
        filledFields.push(`Session ID: ${sessionId}`);
        filledFields.push(`Timestamp: ${new Date().toISOString()}`);
        filledFields.push(`GoHighLevel Contact: ${ghlResult.contactId}`);
        filledFields.push(`GoHighLevel Opportunity: ${workflowResult.opportunityId}`);
        
        await notifyOwner({
          title: `New Intake Submission: ${input.companyName}`,
          content: filledFields.join("\n"),
        });

        return {
          success: true,
          sessionId,
          goHighLevelContactId: ghlResult.contactId,
          goHighLevelOpportunityId: workflowResult.opportunityId,
          message: "Signup completed successfully. Agreement workflow has been triggered.",
        };
      } catch (error) {
        console.error("[Signup Error]", error);

        const errorMessage = error instanceof Error ? error.message : "Unknown error";

        // Notify Robert of the error
        await notifyOwner({
          title: `Signup Error: ${input.companyName}`,
          content: `Failed to process signup for ${input.companyName}.\n\nError: ${errorMessage}\n\nPlease review and manually create the contact in GoHighLevel if needed.`,
        });

        throw new Error(
          `Failed to process signup: ${errorMessage}. Please try again or contact support.`
        );
      }
    }),
});

export type SignupRouter = typeof signupRouter;
