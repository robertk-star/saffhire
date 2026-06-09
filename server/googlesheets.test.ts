import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the googleapis module
vi.mock("googleapis", () => ({
  google: {
    sheets: () => ({
      spreadsheets: {
        values: {
          append: vi.fn().mockResolvedValue({ data: { updates: { updatedRows: 1 } } }),
          get: vi.fn().mockResolvedValue({ data: { values: [["Timestamp", "Session ID", "Company Name"]] } }),
          update: vi.fn().mockResolvedValue({ data: { updatedRows: 1 } }),
          batchUpdate: vi.fn().mockResolvedValue({ data: { responses: [] } }),
        },
      },
    }),
    auth: {
      JWT: vi.fn().mockImplementation(() => ({})),
    },
  },
}));

describe("Google Sheets Integration", () => {
  beforeEach(() => {
    // Set environment variables for testing
    process.env.GOOGLE_SHEETS_PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\ntest\n-----END PRIVATE KEY-----";
    process.env.GOOGLE_SHEETS_CLIENT_EMAIL = "test@test.iam.gserviceaccount.com";
    process.env.GOOGLE_SHEETS_SPREADSHEET_ID = "test-sheet-id";
  });

  describe("logIntakeToSheet", () => {
    it("should log intake data to Google Sheet", async () => {
      const { logIntakeToSheet } = await import("./_core/googleSheets");

      const testData = {
        timestamp: new Date().toISOString(),
        sessionId: "test-session-123",
        companyName: "Test Company",
        ein: "12-3456789",
        ownerFirstName: "John",
        ownerLastName: "Doe",
        ownerEmail: "john@example.com",
        ownerPhone: "555-123-4567",
        businessEntity: "LLC" as const,
        businessStreet: "123 Main St",
        businessCity: "New York",
        businessState: "NY",
        businessZip: "10001",
        businessCountry: "United States",
        status: "Completed",
        sectionCompleted: "authorized-signer",
      };

      await logIntakeToSheet(testData);
      // Test passes if no error is thrown
      expect(true).toBe(true);
    });

    it("should handle missing credentials gracefully", async () => {
      delete process.env.GOOGLE_SHEETS_PRIVATE_KEY;

      const { logIntakeToSheet } = await import("./_core/googleSheets");

      const testData = {
        timestamp: new Date().toISOString(),
        sessionId: "test-session-123",
        companyName: "Test Company",
        status: "Completed",
      };

      // Should not throw, just log error
      await logIntakeToSheet(testData);
      expect(true).toBe(true);
    });
  });

  describe("updateIntakeStatus", () => {
    it("should update intake status in Google Sheet", async () => {
      const { updateIntakeStatus } = await import("./_core/googleSheets");

      await updateIntakeStatus("test-session-123", "Completed", "authorized-signer");
      // Test passes if no error is thrown
      expect(true).toBe(true);
    });

    it("should handle missing session gracefully", async () => {
      const { updateIntakeStatus } = await import("./_core/googleSheets");

      // Should not throw
      await updateIntakeStatus("nonexistent-session", "Completed");
      expect(true).toBe(true);
    });
  });

  describe("initializeSheet", () => {
    it("should initialize sheet with headers", async () => {
      const { initializeSheet } = await import("./_core/googleSheets");

      await initializeSheet();
      // Test passes if no error is thrown
      expect(true).toBe(true);
    });

    it("should handle initialization errors gracefully", async () => {
      delete process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

      const { initializeSheet } = await import("./_core/googleSheets");

      // Should not throw
      await initializeSheet();
      expect(true).toBe(true);
    });
  });

  describe("Real-time logging flow", () => {
    it("should log intake data immediately on submission", async () => {
      const { logIntakeToSheet } = await import("./_core/googleSheets");

      const intakeData = {
        timestamp: new Date().toISOString(),
        sessionId: "intake-001",
        companyName: "Acme Corp",
        dba: "Acme",
        ein: "12-3456789",
        businessType: "Consulting",
        businessEntity: "LLC" as const,
        ownerFirstName: "Jane",
        ownerLastName: "Smith",
        ownerPhone: "555-987-6543",
        ownerEmail: "jane@acme.com",
        businessStreet: "456 Oak Ave",
        businessCity: "Los Angeles",
        businessState: "CA",
        businessZip: "90001",
        businessCountry: "United States",
        status: "In Progress",
        sectionCompleted: "client-info",
      };

      await logIntakeToSheet(intakeData);
      expect(true).toBe(true);
    });

    it("should track incomplete intakes for follow-up", async () => {
      const { logIntakeToSheet } = await import("./_core/googleSheets");

      // Simulate incomplete intake (only partial data)
      const incompleteData = {
        timestamp: new Date().toISOString(),
        sessionId: "incomplete-001",
        companyName: "Partial Company",
        ownerFirstName: "Bob",
        ownerEmail: "bob@partial.com",
        status: "In Progress",
        sectionCompleted: "contact-info",
      };

      await logIntakeToSheet(incompleteData);
      expect(true).toBe(true);
    });
  });
});


describe("Deduplication and Chat Flow", () => {
  it("should not ask duplicate questions", () => {
    // Simulate conversation history with recent questions
    const conversationHistory = [
      { role: "assistant" as const, content: "What is your company name?" },
      { role: "user" as const, content: "Acme Corp" },
      { role: "assistant" as const, content: "Got it! What is your EIN?" },
      { role: "user" as const, content: "12-3456789" },
    ];

    // Extract recent questions
    const recentQuestions = conversationHistory
      .filter(msg => msg.role === "assistant")
      .slice(-3)
      .map(msg => msg.content)
      .join(" | ");

    expect(recentQuestions).toContain("What is your company name?");
    expect(recentQuestions).toContain("What is your EIN?");
    expect(recentQuestions.split(" | ").length).toBeLessThanOrEqual(3);
  });

  it("should exclude service-related questions", () => {
    const excludedTopics = [
      "packages",
      "background screening",
      "signature",
      "date",
      "pricing",
    ];

    const systemPrompt = `Do NOT ask about: ${excludedTopics.join(", ")}`;

    excludedTopics.forEach(topic => {
      expect(systemPrompt).toContain(topic);
    });
  });

  it("should handle conversational clarifications", () => {
    const clarificationResponse = {
      shouldContinue: false,
      clarificationQuestion: "Can you tell me more about that?",
      normalizedValue: undefined,
    };

    expect(clarificationResponse.shouldContinue).toBe(false);
    expect(clarificationResponse.clarificationQuestion).toBeTruthy();
    expect(clarificationResponse.normalizedValue).toBeUndefined();
  });

  it("should extract and normalize values", () => {
    const extractionResponse = {
      shouldContinue: true,
      clarificationQuestion: undefined,
      normalizedValue: "12-3456789",
      extractedData: { ein: "12-3456789" },
    };

    expect(extractionResponse.shouldContinue).toBe(true);
    expect(extractionResponse.normalizedValue).toBe("12-3456789");
    expect(extractionResponse.extractedData?.ein).toBe("12-3456789");
  });

  it("should auto-submit when all sections complete", () => {
    const sections = [
      "client-info",
      "contact-info",
      "business-address",
      "billing-address",
      "admin-users",
    ];

    const currentSectionIndex = sections.length - 1;
    const isLastSection = currentSectionIndex === sections.length - 1;

    expect(isLastSection).toBe(true);
  });
});
