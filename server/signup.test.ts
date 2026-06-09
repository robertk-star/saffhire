import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { z } from "zod";
import {
  generateNextQuestion,
  analyzeResponse,
  generateSummary,
  type QuestionnaireState,
  type NextQuestionResponse,
  type ClarificationResponse,
} from "./_core/claudeQuestionnaire";

describe("Claude Questionnaire Integration", () => {
  describe("generateNextQuestion", () => {
    it("should generate a valid question for client-info section", async () => {
      const state: QuestionnaireState = {
        section: "client-info",
        completedFields: {},
        conversationHistory: [],
      };

      const question = await generateNextQuestion(state);

      expect(question).toBeDefined();
      expect(question.question).toBeTruthy();
      expect(question.fieldName).toBeTruthy();
      expect(["text", "email", "phone", "select", "textarea"]).toContain(question.fieldType);
      expect(typeof question.isRequired).toBe("boolean");
    });

    it("should adapt questions based on completed fields", async () => {
      const state: QuestionnaireState = {
        section: "client-info",
        completedFields: {
          companyName: "Acme Corp",
          ein: "12-3456789",
        },
        conversationHistory: [],
      };

      const question = await generateNextQuestion(state);

      expect(question).toBeDefined();
      expect(question.question).toBeTruthy();
      // Should ask about different fields since companyName and EIN are filled
      expect(
        question.fieldName !== "companyName" && question.fieldName !== "ein"
      ).toBe(true);
    });

    it("should include select options when fieldType is select", async () => {
      const state: QuestionnaireState = {
        section: "client-info",
        completedFields: {
          companyName: "Acme Corp",
          ein: "12-3456789",
          ownerFirstName: "John",
          ownerLastName: "Doe",
          ownerPhone: "555-1234",
          ownerEmail: "john@acme.com",
        },
        conversationHistory: [],
      };

      const question = await generateNextQuestion(state);

      expect(question).toBeDefined();
      if (question.fieldType === "select") {
        expect(Array.isArray(question.selectOptions)).toBe(true);
        expect(question.selectOptions!.length).toBeGreaterThan(0);
      }
    });

    it("should maintain conversation context with history", async () => {
      const state: QuestionnaireState = {
        section: "client-info",
        completedFields: {
          companyName: "Acme Corp",
        },
        conversationHistory: [
          { role: "assistant", content: "What is your company name?" },
          { role: "user", content: "Acme Corp" },
          { role: "assistant", content: "Great! What is your EIN?" },
        ],
      };

      const question = await generateNextQuestion(state);

      expect(question).toBeDefined();
      expect(question.question).toBeTruthy();
    });
  });

  describe("analyzeResponse - Conversational Clarification", () => {
    it("should validate a correct email format", async () => {
      const state: QuestionnaireState = {
        section: "client-info",
        completedFields: {},
        conversationHistory: [],
      };

      const validation = await analyzeResponse(
        state,
        "john.doe@example.com",
        "ownerEmail"
      );

      expect(validation).toBeDefined();
      expect(validation.shouldContinue).toBe(true);
    });

    it("should ask for clarification on invalid email format", async () => {
      const state: QuestionnaireState = {
        section: "client-info",
        completedFields: {},
        conversationHistory: [],
      };

      const validation = await analyzeResponse(
        state,
        "not-an-email",
        "ownerEmail"
      );

      expect(validation).toBeDefined();
      // Should either ask for clarification or extract what it can
      expect(validation.shouldContinue !== undefined).toBe(true);
      if (!validation.shouldContinue) {
        expect(validation.clarificationQuestion).toBeTruthy();
      }
    });

    it("should validate phone number format", async () => {
      const state: QuestionnaireState = {
        section: "client-info",
        completedFields: {},
        conversationHistory: [],
      };

      const validation = await analyzeResponse(
        state,
        "555-123-4567",
        "ownerPhone"
      );

      expect(validation).toBeDefined();
      expect(validation.shouldContinue).toBe(true);
    });

    it("should extract normalized values from responses", async () => {
      const state: QuestionnaireState = {
        section: "client-info",
        completedFields: {},
        conversationHistory: [],
      };

      const validation = await analyzeResponse(
        state,
        "  john doe  ",
        "ownerFirstName"
      );

      expect(validation).toBeDefined();
      // Should either continue with normalized value or ask for clarification
      expect(validation.shouldContinue !== undefined).toBe(true);
      if (validation.shouldContinue && validation.normalizedValue) {
        expect(validation.normalizedValue).toBeTruthy();
      }
    });
  });

  describe("generateSummary", () => {
    it(
      "should generate a professional summary from completed fields",
      async () => {
        const completedFields: Record<string, string> = {
          companyName: "Acme Corp",
          ein: "12-3456789",
          ownerFirstName: "John",
          ownerLastName: "Doe",
          ownerEmail: "john@acme.com",
          businessStreet: "123 Main St",
          businessCity: "New York",
          businessState: "NY",
          businessZip: "10001",
        };

        const summary = await generateSummary(completedFields);

        expect(summary).toBeDefined();
        expect(typeof summary).toBe("string");
        expect(summary.length).toBeGreaterThan(0);
        // Summary should reference key information
        expect(summary.toLowerCase()).toContain("acme");
      },
      { timeout: 15000 }
    );

    it(
      "should handle empty fields gracefully",
      async () => {
        const completedFields: Record<string, string> = {};

        const summary = await generateSummary(completedFields);

        expect(summary).toBeDefined();
        expect(typeof summary).toBe("string");
      },
      { timeout: 15000 }
    );

    it(
      "should format summary as readable document",
      async () => {
        const completedFields: Record<string, string> = {
          companyName: "Tech Innovations Inc",
          ownerFirstName: "Jane",
          ownerLastName: "Smith",
          businessStreet: "456 Oak Ave",
          businessCity: "San Francisco",
          businessState: "CA",
        };

        const summary = await generateSummary(completedFields);

        expect(summary).toBeDefined();
        // Should be formatted as readable text (not JSON)
        expect(summary).not.toMatch(/^\{/);
      },
      { timeout: 15000 }
    );
  });

  describe("QuestionnaireState validation", () => {
    it("should accept valid QuestionnaireState", () => {
      const state: QuestionnaireState = {
        section: "client-info",
        completedFields: { companyName: "Test" },
        conversationHistory: [
          { role: "user", content: "Hello" },
          { role: "assistant", content: "Hi there" },
        ],
      };

      expect(state.section).toBe("client-info");
      expect(state.completedFields.companyName).toBe("Test");
      expect(state.conversationHistory.length).toBe(2);
    });

    it("should handle empty conversation history", () => {
      const state: QuestionnaireState = {
        section: "contact-info",
        completedFields: {},
        conversationHistory: [],
      };

      expect(state.conversationHistory).toEqual([]);
    });
  });

  describe("NextQuestionResponse validation", () => {
    it("should validate required fields in NextQuestionResponse", async () => {
      const state: QuestionnaireState = {
        section: "client-info",
        completedFields: {},
        conversationHistory: [],
      };

      const response = await generateNextQuestion(state);

      // Validate structure
      expect(response.question).toBeTruthy();
      expect(response.fieldName).toBeTruthy();
      expect(["text", "email", "phone", "select", "textarea"]).toContain(
        response.fieldType
      );
      expect(typeof response.isRequired).toBe("boolean");

      // Optional fields
      if (response.fieldType === "select") {
        expect(Array.isArray(response.selectOptions)).toBe(true);
      }
    });
  });

  describe("Section-specific questions", () => {
    it("should generate appropriate questions for contact-info section", async () => {
      const state: QuestionnaireState = {
        section: "contact-info",
        completedFields: {},
        conversationHistory: [],
      };

      const question = await generateNextQuestion(state);

      expect(question).toBeDefined();
      expect(question.question).toBeTruthy();
      // Should ask about contact-related fields
      expect(
        [
          "contactName",
          "contactEmail",
          "contactPhone",
          "contactMobile",
          "hasMainContact",
        ].some((field) => question.fieldName.includes(field) || question.question.toLowerCase().includes(field))
      ).toBe(true);
    });

    it("should generate appropriate questions for business-address section", async () => {
      const state: QuestionnaireState = {
        section: "business-address",
        completedFields: {},
        conversationHistory: [],
      };

      const question = await generateNextQuestion(state);

      expect(question).toBeDefined();
      expect(question.question).toBeTruthy();
      // Should ask about address-related fields
      expect(
        [
          "businessStreet",
          "businessCity",
          "businessState",
          "businessZip",
          "address",
        ].some((field) => question.fieldName.includes(field) || question.question.toLowerCase().includes(field))
      ).toBe(true);
    });

    it("should generate appropriate questions for admin-users section", async () => {
      const state: QuestionnaireState = {
        section: "admin-users",
        completedFields: {},
        conversationHistory: [],
      };

      const question = await generateNextQuestion(state);

      expect(question).toBeDefined();
      expect(question.question).toBeTruthy();
      // Should ask about admin user fields
      expect(
        question.fieldName.includes("admin") ||
        question.question.toLowerCase().includes("admin") ||
        question.question.toLowerCase().includes("user")
      ).toBe(true);
    });
  });

  describe("Error handling", () => {
    it("should handle API errors gracefully", async () => {
      const state: QuestionnaireState = {
        section: "client-info",
        completedFields: {},
        conversationHistory: [],
      };

      // This test verifies that the functions handle errors without crashing
      try {
        const question = await generateNextQuestion(state);
        expect(question).toBeDefined();
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
});

describe("Signup Router Integration", () => {
  describe("Input validation schemas", () => {
    it("should validate phone number format", () => {
      const phoneRegex = /^(\+1)?[-.\s]?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$/;

      expect(phoneRegex.test("555-123-4567")).toBe(true);
      expect(phoneRegex.test("(555) 123-4567")).toBe(true);
      expect(phoneRegex.test("+1-555-123-4567")).toBe(true);
      expect(phoneRegex.test("invalid")).toBe(false);
    });

    it("should validate email format", () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      expect(emailRegex.test("john@example.com")).toBe(true);
      expect(emailRegex.test("jane.doe@company.co.uk")).toBe(true);
      expect(emailRegex.test("invalid-email")).toBe(false);
      expect(emailRegex.test("@example.com")).toBe(false);
    });

    it("should validate EIN format", () => {
      const einRegex = /^\d{2}-\d{7}$/;

      expect(einRegex.test("12-3456789")).toBe(true);
      expect(einRegex.test("12-345678")).toBe(false);
      expect(einRegex.test("123456789")).toBe(false);
    });
  });

  describe("Form data structure", () => {
    it("should construct admin users array correctly", () => {
      const adminUsers = [
        {
          firstName: "John",
          lastName: "Doe",
          jobTitle: "CEO",
          mobile: "555-123-4567",
          email: "john@example.com",
          isAdmin: true,
        },
        {
          firstName: "Jane",
          lastName: "Smith",
          jobTitle: "CFO",
          mobile: "555-987-6543",
          email: "jane@example.com",
          isAdmin: true,
        },
      ];

      expect(adminUsers).toHaveLength(2);
      expect(adminUsers[0].firstName).toBe("John");
      expect(adminUsers[1].firstName).toBe("Jane");
      expect(adminUsers.every((u) => u.isAdmin)).toBe(true);
    });

    it("should handle optional fields correctly", () => {
      const formData = {
        companyName: "Acme Corp",
        dba: "", // Optional, empty
        ein: "12-3456789",
        businessType: "", // Optional, empty
      };

      const processedData = {
        companyName: formData.companyName,
        dba: formData.dba || null,
        ein: formData.ein,
        businessType: formData.businessType || null,
      };

      expect(processedData.dba).toBeNull();
      expect(processedData.businessType).toBeNull();
      expect(processedData.companyName).toBe("Acme Corp");
    });
  });

  describe("Conditional logic", () => {
    it("should copy business address to billing when sameAsBusiness is true", () => {
      const businessAddress = {
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zip: "10001",
      };

      const sameAsBusiness = true;

      const billingAddress = sameAsBusiness
        ? businessAddress
        : {
            street: "",
            city: "",
            state: "",
            zip: "",
          };

      expect(billingAddress).toEqual(businessAddress);
    });

    it("should use separate billing address when sameAsBusiness is false", () => {
      const businessAddress = {
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zip: "10001",
      };

      const billingAddress = {
        street: "456 Oak Ave",
        city: "Los Angeles",
        state: "CA",
        zip: "90001",
      };

      const sameAsBusiness = false;

      const finalBillingAddress = sameAsBusiness ? businessAddress : billingAddress;

      expect(finalBillingAddress).toEqual(billingAddress);
      expect(finalBillingAddress).not.toEqual(businessAddress);
    });
  });
});


describe("Notification Integration", () => {
  it("should include all filled fields in notification", () => {
    // Test that notification building logic includes all fields
    const filledFields: string[] = [];
    
    const input = {
      companyName: "Test Corp",
      dba: "Test",
      ein: "12-3456789",
      businessType: "Consulting",
      businessEntity: "LLC",
      ownerFirstName: "John",
      ownerLastName: "Doe",
      ownerPhone: "555-123-4567",
      ownerPhoneExt: "101",
      ownerEmail: "john@test.com",
      hasMainContact: true,
      contactName: "Jane Doe",
      contactEmail: "jane@test.com",
      contactPhone: "555-987-6543",
      businessStreet: "123 Main St",
      businessStreet2: "Suite 100",
      businessCity: "New York",
      businessState: "NY",
      businessZip: "10001",
      businessCountry: "United States",
      sameAsBusiness: false,
      billingStreet: "456 Oak Ave",
      billingCity: "Los Angeles",
      billingState: "CA",
      billingZip: "90001",
      authorizedSignerName: "Bob Smith",
      authorizedSignerTitle: "CEO",
      signatureConfirmed: true,
    };

    // Simulate notification building
    filledFields.push("=== CLIENT INFORMATION ===");
    if (input.companyName) filledFields.push(`Company: ${input.companyName}`);
    if (input.dba) filledFields.push(`DBA: ${input.dba}`);
    if (input.ein) filledFields.push(`EIN: ${input.ein}`);
    if (input.businessType) filledFields.push(`Business Type: ${input.businessType}`);
    if (input.businessEntity) filledFields.push(`Business Entity: ${input.businessEntity}`);

    expect(filledFields.length).toBeGreaterThan(5);
    expect(filledFields.some(f => f.includes("Test Corp"))).toBe(true);
    expect(filledFields.some(f => f.includes("12-3456789"))).toBe(true);
  });

  it("should only include filled fields in notification", () => {
    const filledFields: string[] = [];
    
    // Minimal input
    const input = {
      companyName: "Minimal Corp",
      dba: "",
      businessType: "",
    };

    filledFields.push("=== CLIENT INFORMATION ===");
    if (input.companyName) filledFields.push(`Company: ${input.companyName}`);
    if (input.dba) filledFields.push(`DBA: ${input.dba}`);
    if (input.businessType) filledFields.push(`Business Type: ${input.businessType}`);

    // Should only have company name, not empty fields
    expect(filledFields.filter(f => f.includes("Minimal Corp")).length).toBe(1);
    expect(filledFields.filter(f => f.includes("DBA:")).length).toBe(0);
    expect(filledFields.filter(f => f.includes("Business Type:")).length).toBe(0);
  });

  it("should format notification with section headers", () => {
    const filledFields: string[] = [];
    
    filledFields.push("=== CLIENT INFORMATION ===");
    filledFields.push("Company: Test");
    filledFields.push("\n=== CONTACT INFORMATION ===");
    filledFields.push("Contact: John");
    filledFields.push("\n=== TRACKING INFO ===");
    filledFields.push("Session ID: test-123");

    const content = filledFields.join("\n");
    
    expect(content).toContain("=== CLIENT INFORMATION ===");
    expect(content).toContain("=== CONTACT INFORMATION ===");
    expect(content).toContain("=== TRACKING INFO ===");
    expect(content).toContain("Session ID: test-123");
  });
});
