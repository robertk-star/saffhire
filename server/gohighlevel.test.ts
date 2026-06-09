import { describe, it, expect } from "vitest";

/**
 * Test to validate GoHighLevel API credentials
 * This test verifies that the API keys are properly configured
 */
describe("GoHighLevel API Integration", () => {
  it("should have required environment variables set", () => {
    // Check that the temporary API key is set
    expect(process.env.GOHIGHLEVEL_API_KEY_TEMP).toBeDefined();
    expect(process.env.GOHIGHLEVEL_API_KEY_TEMP).toBeTruthy();

    // Check that the production API key is set
    expect(process.env.GOHIGHLEVEL_API_KEY_PROD).toBeDefined();
    expect(process.env.GOHIGHLEVEL_API_KEY_PROD).toBeTruthy();

    // Check that location ID is set
    expect(process.env.GOHIGHLEVEL_LOCATION_ID).toBeDefined();
    expect(process.env.GOHIGHLEVEL_LOCATION_ID).toBe("nJeO25J5rlbRP0HLu1CJ");

    // Check that notification email is set
    expect(process.env.GOHIGHLEVEL_NOTIFICATION_EMAIL).toBeDefined();
    expect(process.env.GOHIGHLEVEL_NOTIFICATION_EMAIL).toBe("robertk@saffhire.com");
  });

  it("should format API keys correctly", () => {
    const tempKey = process.env.GOHIGHLEVEL_API_KEY_TEMP;
    const prodKey = process.env.GOHIGHLEVEL_API_KEY_PROD;

    // API keys should follow the pit-* format
    expect(tempKey).toMatch(/^pit-[a-f0-9-]+$/);
    expect(prodKey).toMatch(/^pit-[a-f0-9-]+$/);
  });

  it("should have different temporary and production keys", () => {
    const tempKey = process.env.GOHIGHLEVEL_API_KEY_TEMP;
    const prodKey = process.env.GOHIGHLEVEL_API_KEY_PROD;

    // Ensure they're different keys
    expect(tempKey).not.toBe(prodKey);
  });

  it("should validate location ID format", () => {
    const locationId = process.env.GOHIGHLEVEL_LOCATION_ID;

    // Location ID should be alphanumeric
    expect(locationId).toMatch(/^[a-zA-Z0-9]+$/);
    expect(locationId?.length).toBeGreaterThan(10);
  });

  it("should validate notification email format", () => {
    const email = process.env.GOHIGHLEVEL_NOTIFICATION_EMAIL;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    expect(email).toMatch(emailRegex);
    expect(email).toBe("robertk@saffhire.com");
  });
});
