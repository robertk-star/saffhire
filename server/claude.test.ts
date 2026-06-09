import { describe, it, expect } from "vitest";
import { Anthropic } from "@anthropic-ai/sdk";

describe("Claude API Integration", () => {
  it("should validate Claude API key by making a test request", async () => {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    expect(apiKey).toBeDefined();
    expect(apiKey).toMatch(/^sk-ant-/);

    const client = new Anthropic({ apiKey });

    const response = await client.messages.create({
      model: "claude-opus-4-1-20250805",
      max_tokens: 100,
      messages: [
        {
          role: "user",
          content: "Say 'Claude API is working' in exactly those words.",
        },
      ],
    });

    expect(response).toBeDefined();
    expect(response.content).toBeDefined();
    expect(response.content.length).toBeGreaterThan(0);
    expect(response.content[0].type).toBe("text");

    const textContent = response.content[0];
    if (textContent.type === "text") {
      expect(textContent.text).toContain("Claude API is working");
    }
  });
});
