import { int, json, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, date } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Referral partner leads - tracks contact form submissions from partner pages
export const referralLeads = mysqlTable("referral_leads", {
  id: int("id").autoincrement().primaryKey(),
  partnerSlug: varchar("partnerSlug", { length: 64 }).notNull(), // e.g. "benefitsme"
  partnerName: varchar("partnerName", { length: 128 }).notNull(),
  firstName: varchar("firstName", { length: 128 }).notNull(),
  lastName: varchar("lastName", { length: 128 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 32 }),
  company: varchar("company", { length: 256 }),
  employeeCount: varchar("employeeCount", { length: 64 }),
  message: text("message"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ReferralLead = typeof referralLeads.$inferSelect;
export type InsertReferralLead = typeof referralLeads.$inferInsert;

// AI Intake form responses - tracks responses from account setup questionnaire
export const intakeResponses = mysqlTable("intake_responses", {
  id: int("id").autoincrement().primaryKey(),
  sessionId: varchar("sessionId", { length: 128 }).notNull(),
  email: varchar("email", { length: 320 }),
  responses: text("responses").notNull(),
  claudeAnalysis: text("claudeAnalysis"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type IntakeResponse = typeof intakeResponses.$inferSelect;
export type InsertIntakeResponse = typeof intakeResponses.$inferInsert;

// Client credentialing intake - comprehensive signup form for new clients
export const signupIntakes = mysqlTable("signup_intakes", {
  id: int("id").autoincrement().primaryKey(),
  sessionId: varchar("sessionId", { length: 128 }).notNull().unique(),
  
  // Client Information
  companyName: varchar("companyName", { length: 256 }).notNull(),
  dba: varchar("dba", { length: 256 }),
  ein: varchar("ein", { length: 32 }).notNull(),
  businessType: varchar("businessType", { length: 128 }),
  businessEntity: mysqlEnum("businessEntity", ["LLC", "Inc", "PrivateCorp", "Partnership", "SoleProprietor"]).notNull(),
  ownerFirstName: varchar("ownerFirstName", { length: 128 }).notNull(),
  ownerLastName: varchar("ownerLastName", { length: 128 }).notNull(),
  ownerPhone: varchar("ownerPhone", { length: 32 }).notNull(),
  ownerPhoneExt: varchar("ownerPhoneExt", { length: 16 }),
  ownerEmail: varchar("ownerEmail", { length: 320 }).notNull(),
  
  // Contact Information (optional, if different from owner)
  hasMainContact: boolean("hasMainContact").default(false),
  contactName: varchar("contactName", { length: 128 }),
  contactEmail: varchar("contactEmail", { length: 320 }),
  contactPhone: varchar("contactPhone", { length: 32 }),
  contactPhoneExt: varchar("contactPhoneExt", { length: 16 }),
  contactMobile: varchar("contactMobile", { length: 32 }),
  
  // Business Address
  businessStreet: varchar("businessStreet", { length: 256 }).notNull(),
  businessStreet2: varchar("businessStreet2", { length: 256 }),
  businessCity: varchar("businessCity", { length: 128 }).notNull(),
  businessState: varchar("businessState", { length: 64 }).notNull(),
  businessZip: varchar("businessZip", { length: 16 }).notNull(),
  businessCountry: varchar("businessCountry", { length: 128 }).default("United States"),
  
  // Billing Address
  sameAsBusiness: boolean("sameAsBusiness").default(true),
  billingStreet: varchar("billingStreet", { length: 256 }),
  billingStreet2: varchar("billingStreet2", { length: 256 }),
  billingCity: varchar("billingCity", { length: 128 }),
  billingState: varchar("billingState", { length: 64 }),
  billingZip: varchar("billingZip", { length: 16 }),
  billingCountry: varchar("billingCountry", { length: 128 }),
  billingAttention: varchar("billingAttention", { length: 128 }),
  
  // Admin Users (stored as JSON string)
  adminUsers: text("adminUsers").notNull(),
  
  // Authorized Signer
  authorizedSignerName: varchar("authorizedSignerName", { length: 128 }).notNull(),
  authorizedSignerTitle: varchar("authorizedSignerTitle", { length: 128 }).notNull(),
  signatureDate: date("signatureDate"),
  signatureConfirmed: boolean("signatureConfirmed").default(false),
  
  // GoHighLevel Integration
  goHighLevelContactId: varchar("goHighLevelContactId", { length: 128 }),
  goHighLevelOpportunityId: varchar("goHighLevelOpportunityId", { length: 128 }),
  agreementStatus: varchar("agreementStatus", { length: 64 }).default("Pending"),
  
  // Metadata
  status: varchar("status", { length: 64 }).default("Completed"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SignupIntake = typeof signupIntakes.$inferSelect;
export type InsertSignupIntake = typeof signupIntakes.$inferInsert;
