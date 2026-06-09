import { Anthropic } from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export interface QuestionnaireState {
  section: string;
  completedFields: Record<string, string>;
  currentQuestion?: string;
  conversationHistory: Array<{
    role: "user" | "assistant";
    content: string;
  }>;
}

export interface NextQuestionResponse {
  question: string;
  fieldName: string;
  fieldType: "text" | "email" | "phone" | "select" | "textarea";
  selectOptions?: string[];
  isRequired: boolean;
  helpText?: string;
}

const SYSTEM_PROMPT = `You are a friendly, professional business intake specialist for SaffHire, a background screening company. Your role is to conduct a natural, conversational interview to collect credentialing information from new clients.

Your approach:
1. Ask one clear, specific question at a time
2. Be warm and conversational - make the client feel comfortable
3. Ask follow-up questions based on previous answers to gather more context
4. If a response seems unclear or incomplete, ask clarifying questions naturally (e.g., "Can you tell me more about that?" or "Just to make sure I understand...")
5. Adapt your questions based on the company type and business model
6. Never reject responses - instead, engage in dialogue to understand what the client means
7. DO NOT ask about: packages, background screening services, signatures, or dates
8. Focus only on collecting business and contact information

Current section: {section}

Completed information so far:
{completedFields}

When generating the next question:
1. Return ONLY a valid JSON object with this exact structure:
{
  "question": "Your question here?",
  "fieldName": "field_name_in_snake_case",
  "fieldType": "text|email|phone|select|textarea",
  "selectOptions": ["option1", "option2"] (only if fieldType is select),
  "isRequired": true|false,
  "helpText": "Optional help text"
}

2. Do NOT include any text before or after the JSON
3. Do NOT include markdown formatting
4. Ensure the JSON is valid and parseable

Field naming conventions:
- Client Info section: companyName, dba, ein, businessType, ownerFirstName, ownerLastName, ownerPhone, ownerPhoneExt, ownerEmail, businessEntity
- Contact Info section: contactName, contactEmail, contactPhone, contactPhoneExt, contactMobile
- Business Address: businessStreet, businessStreet2, businessCity, businessState, businessZip, businessCountry
- Billing Address: billingStreet, billingStreet2, billingCity, billingState, billingZip, billingCountry, billingAttention
- Admin Users: adminUser1FirstName, adminUser1LastName, adminUser1JobTitle, adminUser1Mobile, adminUser1Email, adminUser2FirstName, etc.

IMPORTANT: Do NOT ask questions about:
- Packages or pricing
- Background screening services or details
- Signatures or signature dates
- Any service-related questions

Only ask for business information, contact details, and admin user information.

When you have collected all necessary information for the current section and there are no more questions to ask, respond with this EXACT JSON:
{
  "question": "Thank you for providing your information! You will be receiving an agreement to review and sign. In the meantime, we will get started on setting up your account.",
  "fieldName": "_section_complete",
  "fieldType": "text",
  "isRequired": false
}

This signals that the section is complete. Do NOT ask any more questions after this.`;

export async function generateNextQuestion(
  state: QuestionnaireState
): Promise<NextQuestionResponse> {
  const completedFieldsStr = Object.entries(state.completedFields)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");

  // Get recently asked questions from conversation history to avoid duplicates
  const recentQuestions = state.conversationHistory
    .filter(msg => msg.role === "assistant")
    .slice(-3) // Look at last 3 assistant messages
    .map(msg => msg.content)
    .join(" | ");

  let systemPrompt = SYSTEM_PROMPT.replace("{section}", state.section).replace(
    "{completedFields}",
    completedFieldsStr || "None yet"
  );

  // Add deduplication instruction
  if (recentQuestions) {
    systemPrompt += `\n\nRECENT QUESTIONS (do NOT repeat these): ${recentQuestions}`;
  }

  const messages = [
    ...state.conversationHistory,
    {
      role: "user" as const,
      content: "What is the next question you need to ask?",
    },
  ];

  const response = await client.messages.create({
    model: "claude-opus-4-1-20250805",
    max_tokens: 500,
    system: systemPrompt,
    messages,
  });

  const content = response.content[0];
  if (content.type !== "text") {
    throw new Error("Unexpected response type from Claude");
  }

  // Parse the JSON response
  const jsonMatch = content.text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("Claude did not return valid JSON");
  }

  const questionData = JSON.parse(jsonMatch[0]) as NextQuestionResponse;

  // Validate the response structure
  if (
    !questionData.question ||
    !questionData.fieldName ||
    !questionData.fieldType
  ) {
    throw new Error("Claude response missing required fields");
  }

  return questionData;
}

export interface ClarificationResponse {
  shouldContinue: boolean;
  clarificationQuestion?: string;
  normalizedValue?: string;
  extractedData?: Record<string, string>;
}

export async function analyzeResponse(
  state: QuestionnaireState,
  userResponse: string,
  fieldName: string
): Promise<ClarificationResponse> {
  const messages = [
    ...state.conversationHistory,
    {
      role: "user" as const,
      content: `The user answered "${userResponse}" to the question about ${fieldName}. 
      
Analyze this response and determine:
1. Can you extract the needed information from this response?
2. If yes, what is the normalized/cleaned value?
3. If no or unclear, what clarifying question should we ask naturally (as if continuing a conversation)?

Return a JSON object:
{
  "shouldContinue": true if the response is clear enough to proceed, false if we need clarification,
  "clarificationQuestion": "A natural follow-up question if shouldContinue is false (e.g., 'Can you tell me more about that?' or 'Just to clarify...')",
  "normalizedValue": "The cleaned/normalized value if shouldContinue is true",
  "extractedData": {any additional fields we can extract from the response}
}

Only return JSON, no other text.`,
    },
  ];

  const response = await client.messages.create({
    model: "claude-opus-4-1-20250805",
    max_tokens: 300,
    system: `You are a conversational AI that helps extract information naturally. Your goal is to understand what the user means and ask clarifying questions if needed, rather than rejecting responses. Be friendly and helpful.`,
    messages,
  });

  const content = response.content[0];
  if (content.type !== "text") {
    throw new Error("Unexpected response type from Claude");
  }

  const jsonMatch = content.text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("Claude did not return valid JSON");
  }

  return JSON.parse(jsonMatch[0]);
}

export async function generateSummary(
  completedFields: Record<string, string>
): Promise<string> {
  const fieldsStr = Object.entries(completedFields)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");

  const response = await client.messages.create({
    model: "claude-opus-4-1-20250805",
    max_tokens: 1000,
    system: `You are a professional business analyst. Create a clear, professional summary of the client intake information provided. Format it as a readable document with sections.`,
    messages: [
      {
        role: "user",
        content: `Please create a professional summary of this client intake information:\n\n${fieldsStr}`,
      },
    ],
  });

  const content = response.content[0];
  if (content.type !== "text") {
    throw new Error("Unexpected response type from Claude");
  }

  return content.text;
}
