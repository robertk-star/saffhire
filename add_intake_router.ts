// Add intake router before referral router
const intakeRouter = `  intake: router({
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

        const sessionId = \`intake_\${Date.now()}_\${Math.random().toString(36).substr(2, 9)}\`;

        await db.insert(intakeResponses).values({
          sessionId,
          email: null,
          responses: JSON.stringify(input.responses),
          claudeAnalysis: null,
        });

        const responsesSummary = input.responses
          .map((r) => \`Q: \${r.question}\\nA: \${r.answer}\`)
          .join("\\n\\n");

        await notifyOwner({
          title: "New Account Setup Intake Submission",
          content: \`Session ID: \${sessionId}\\n\\n\${responsesSummary}\`,
        });

        return { success: true, sessionId };
      }),
  }),
`;
