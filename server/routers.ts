import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { notifyOwner } from "./_core/notification";
import { getDb } from "./db";
import { referralLeads, intakeResponses, signupIntakes } from "../drizzle/schema";
import { z } from "zod";
import { signupRouter } from "./signup.router";

export const appRouter = router({
  system: systemRouter,
  signup: signupRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  intake: router({
    submitResponses: publicProcedure
      .input(
        z.object({
          responses: z.array(
            z.object({
              questionId: z.string(),
              question: z.string(),
              answer: z.string(),
            })
          ),
        })
      )
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database unavailable");

        const sessionId = `intake_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        await db.insert(intakeResponses).values({
          sessionId,
          email: null,
          responses: JSON.stringify(input.responses),
          claudeAnalysis: null,
        });

        const responsesSummary = input.responses
          .map((r) => `Q: ${r.question}\nA: ${r.answer}`)
          .join("\n\n");

        await notifyOwner({
          title: "New Account Setup Intake Submission",
          content: `Session ID: ${sessionId}\n\n${responsesSummary}`,
        });

        return { success: true, sessionId };
      }),
  }),

  referral: router({
    submitLead: publicProcedure
      .input(
        z.object({
          partnerSlug: z.string().min(1),
          partnerName: z.string().min(1),
          firstName: z.string().min(1, "First name is required"),
          lastName: z.string().min(1, "Last name is required"),
          email: z.string().email("Please enter a valid email address"),
          phone: z.string().optional(),
          company: z.string().optional(),
          employeeCount: z.string().optional(),
          message: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database unavailable");

        // Save lead to database
        await db.insert(referralLeads).values({
          partnerSlug: input.partnerSlug,
          partnerName: input.partnerName,
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          phone: input.phone ?? null,
          company: input.company ?? null,
          employeeCount: input.employeeCount ?? null,
          message: input.message ?? null,
        });

        // Notify SaffHire owner
        const notifContent = [
          `Partner: ${input.partnerName}`,
          `Name: ${input.firstName} ${input.lastName}`,
          `Email: ${input.email}`,
          input.phone ? `Phone: ${input.phone}` : null,
          input.company ? `Company: ${input.company}` : null,
          input.employeeCount ? `Employee Count: ${input.employeeCount}` : null,
          input.message ? `Message: ${input.message}` : null,
        ]
          .filter(Boolean)
          .join("\n");

        await notifyOwner({
          title: `New Referral Lead: ${input.partnerName}`,
          content: notifContent,
        });

        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
