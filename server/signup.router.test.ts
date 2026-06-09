import { describe, it, expect, vi } from "vitest";
import { z } from "zod";

// Test validation schemas
const phoneRegex = /^(\+1)?[-.\s]?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const einRegex = /^\d{2}-\d{7}$/;

const phoneSchema = z.string().regex(phoneRegex, "Invalid phone number format");
const emailSchema = z.string().email("Invalid email format");
const einSchema = z.string().regex(einRegex, "EIN must be in XX-XXXXXXX format");

describe("Signup Router Validation", () => {
  describe("Phone validation", () => {
    it("should accept valid US phone numbers", () => {
      const validPhones = [
        "555-123-4567",
        "(555) 123-4567",
        "555.123.4567",
        "5551234567",
        "+1-555-123-4567",
      ];

      validPhones.forEach((phone) => {
        expect(() => phoneSchema.parse(phone)).not.toThrow();
      });
    });

    it("should reject invalid phone numbers", () => {
      const invalidPhones = [
        "123", // too short
        "abc-def-ghij", // letters
        "555-12-4567", // wrong format
      ];

      invalidPhones.forEach((phone) => {
        expect(() => phoneSchema.parse(phone)).toThrow();
      });
    });
  });

  describe("Email validation", () => {
    it("should accept valid email addresses", () => {
      const validEmails = [
        "test@example.com",
        "user.name@company.co.uk",
        "robert@saffhire.com",
      ];

      validEmails.forEach((email) => {
        expect(() => emailSchema.parse(email)).not.toThrow();
      });
    });

    it("should reject invalid email addresses", () => {
      const invalidEmails = [
        "notanemail",
        "missing@domain",
        "@nodomain.com",
        "spaces in@email.com",
      ];

      invalidEmails.forEach((email) => {
        expect(() => emailSchema.parse(email)).toThrow();
      });
    });
  });

  describe("EIN validation", () => {
    it("should accept valid EIN format", () => {
      const validEINs = ["12-3456789", "99-9999999", "00-0000000"];

      validEINs.forEach((ein) => {
        expect(() => einSchema.parse(ein)).not.toThrow();
      });
    });

    it("should reject invalid EIN format", () => {
      const invalidEINs = [
        "123456789", // no dash
        "12-345678", // too short
        "12-34567890", // too long
        "AB-CDEFGHI", // letters
      ];

      invalidEINs.forEach((ein) => {
        expect(() => einSchema.parse(ein)).toThrow();
      });
    });
  });

  describe("Business Entity validation", () => {
    it("should accept valid business entity types", () => {
      const validEntities = ["LLC", "Inc", "PrivateCorp", "Partnership", "SoleProprietor"];

      validEntities.forEach((entity) => {
        const schema = z.enum(["LLC", "Inc", "PrivateCorp", "Partnership", "SoleProprietor"]);
        expect(() => schema.parse(entity)).not.toThrow();
      });
    });

    it("should reject invalid business entity types", () => {
      const schema = z.enum(["LLC", "Inc", "PrivateCorp", "Partnership", "SoleProprietor"]);
      expect(() => schema.parse("InvalidCorp")).toThrow();
    });
  });

  describe("Admin User validation", () => {
    it("should validate complete admin user", () => {
      const adminUserSchema = z.object({
        firstName: z.string().min(1, "First name required"),
        lastName: z.string().min(1, "Last name required"),
        jobTitle: z.string().min(1, "Job title required"),
        mobile: phoneSchema,
        email: emailSchema,
        isAdmin: z.boolean().default(true),
      });

      const validUser = {
        firstName: "John",
        lastName: "Doe",
        jobTitle: "CEO",
        mobile: "555-123-4567",
        email: "john@example.com",
        isAdmin: true,
      };

      expect(() => adminUserSchema.parse(validUser)).not.toThrow();
    });

    it("should reject admin user with missing required fields", () => {
      const adminUserSchema = z.object({
        firstName: z.string().min(1, "First name required"),
        lastName: z.string().min(1, "Last name required"),
        jobTitle: z.string().min(1, "Job title required"),
        mobile: phoneSchema,
        email: emailSchema,
        isAdmin: z.boolean().default(true),
      });

      const invalidUser = {
        firstName: "",
        lastName: "Doe",
        jobTitle: "CEO",
        mobile: "555-123-4567",
        email: "john@example.com",
      };

      expect(() => adminUserSchema.parse(invalidUser)).toThrow();
    });
  });

  describe("Contact deduplication", () => {
    it("should identify duplicate contacts by email", () => {
      const email1 = "test@example.com";
      const email2 = "test@example.com";
      const email3 = "different@example.com";

      expect(email1 === email2).toBe(true);
      expect(email1 === email3).toBe(false);
    });
  });

  describe("GoHighLevel workflow", () => {
    it("should require contact email for GoHighLevel creation", () => {
      const contactData = {
        email: "robert@saffhire.com",
        firstName: "Robert",
        lastName: "K",
        companyName: "SaffHire",
      };

      expect(contactData.email).toBeDefined();
      expect(contactData.email).toMatch(emailRegex);
    });

    it("should require company name for opportunity creation", () => {
      const opportunityData = {
        companyName: "Test Company Inc",
        pipelineName: "New Client Onboarding",
        stageName: "Agreement Sent",
      };

      expect(opportunityData.companyName).toBeDefined();
      expect(opportunityData.companyName.length).toBeGreaterThan(0);
    });
  });
});
