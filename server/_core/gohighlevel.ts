/**
 * GoHighLevel API Helper Functions
 * Handles all GoHighLevel API calls for the signup workflow
 * API credentials are stored server-side only and never exposed to frontend
 */

const GHL_API_BASE = "https://rest.gohighlevel.com/v1";

// Get the active API key (temporary or production based on current date)
function getActiveApiKey(): string {
  const tempKey = process.env.GOHIGHLEVEL_API_KEY_TEMP;
  const prodKey = process.env.GOHIGHLEVEL_API_KEY_PROD;

  if (!tempKey || !prodKey) {
    throw new Error("GoHighLevel API keys not configured");
  }

  // For now, use temporary key. In 6 days, switch to production key
  // TODO: Implement date-based switching logic if needed
  return tempKey;
}

function getLocationId(): string {
  const locationId = process.env.GOHIGHLEVEL_LOCATION_ID;
  if (!locationId) {
    throw new Error("GoHighLevel location ID not configured");
  }
  return locationId;
}

// Helper function to make GoHighLevel API calls
async function makeGHLRequest(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "PATCH" = "GET",
  body?: Record<string, any>
) {
  const apiKey = getActiveApiKey();
  const url = `${GHL_API_BASE}${endpoint}`;

  const options: RequestInit = {
    method,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      `GoHighLevel API Error: ${response.status} - ${errorData.message || response.statusText}`
    );
  }

  return response.json();
}

/**
 * Create or update a contact in GoHighLevel
 * Prevents duplicate contacts by checking email
 */
export async function createOrUpdateContact(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  additionalNotes?: string;
}): Promise<{ contactId: string; isNew: boolean }> {
  const locationId = getLocationId();

  try {
    // First, search for existing contact by email
    const searchResponse = await makeGHLRequest(
      `/locations/${locationId}/contacts/search?email=${encodeURIComponent(data.email)}`
    );

    if (searchResponse.contacts && searchResponse.contacts.length > 0) {
      // Contact exists, return existing ID
      const existingContact = searchResponse.contacts[0];
      console.log(`[GoHighLevel] Found existing contact: ${existingContact.id}`);

      // Update contact with new information
      await makeGHLRequest(
        `/locations/${locationId}/contacts/${existingContact.id}`,
        "PUT",
        {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          companyName: data.companyName,
          notes: data.additionalNotes || "",
        }
      );

      return { contactId: existingContact.id, isNew: false };
    }

    // Contact doesn't exist, create new one
    const createResponse = await makeGHLRequest(
      `/locations/${locationId}/contacts`,
      "POST",
      {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        companyName: data.companyName,
        notes: data.additionalNotes || "",
      }
    );

    console.log(`[GoHighLevel] Created new contact: ${createResponse.contact.id}`);
    return { contactId: createResponse.contact.id, isNew: true };
  } catch (error) {
    console.error("[GoHighLevel] Contact creation/update failed:", error);
    throw error;
  }
}

/**
 * Add tags to a contact
 */
export async function addTagsToContact(
  contactId: string,
  tags: string[]
): Promise<void> {
  const locationId = getLocationId();

  try {
    for (const tag of tags) {
      await makeGHLRequest(
        `/locations/${locationId}/contacts/${contactId}/tags`,
        "POST",
        { tag }
      );
    }

    console.log(`[GoHighLevel] Added tags to contact ${contactId}: ${tags.join(", ")}`);
  } catch (error) {
    console.error("[GoHighLevel] Failed to add tags:", error);
    throw error;
  }
}

/**
 * Create an opportunity in GoHighLevel
 */
export async function createOpportunity(data: {
  contactId: string;
  companyName: string;
  pipelineId?: string;
  stageId?: string;
}): Promise<{ opportunityId: string }> {
  const locationId = getLocationId();

  try {
    // For now, use default pipeline/stage. You may need to fetch these IDs from GoHighLevel
    const opportunityResponse = await makeGHLRequest(
      `/locations/${locationId}/opportunities`,
      "POST",
      {
        contactId: data.contactId,
        name: `${data.companyName} - New Account`,
        pipelineId: data.pipelineId || "default", // Will be replaced with actual pipeline ID
        stageId: data.stageId || "agreement_sent", // Will be replaced with actual stage ID
        status: "open",
      }
    );

    console.log(
      `[GoHighLevel] Created opportunity: ${opportunityResponse.opportunity.id}`
    );
    return { opportunityId: opportunityResponse.opportunity.id };
  } catch (error) {
    console.error("[GoHighLevel] Failed to create opportunity:", error);
    throw error;
  }
}

/**
 * Trigger a workflow in GoHighLevel
 * The "Agreement Needed" tag will trigger the agreement workflow
 */
export async function triggerAgreementWorkflow(contactId: string): Promise<void> {
  // The workflow is triggered automatically when the "Agreement Needed" tag is added
  // This function is a placeholder for any additional workflow logic
  console.log(`[GoHighLevel] Agreement workflow triggered for contact: ${contactId}`);
}

/**
 * Get contact details from GoHighLevel
 */
export async function getContactDetails(contactId: string): Promise<any> {
  const locationId = getLocationId();

  try {
    const response = await makeGHLRequest(
      `/locations/${locationId}/contacts/${contactId}`
    );

    return response.contact;
  } catch (error) {
    console.error("[GoHighLevel] Failed to get contact details:", error);
    throw error;
  }
}

/**
 * Update opportunity status
 */
export async function updateOpportunityStatus(
  opportunityId: string,
  status: "open" | "won" | "lost" | "pending"
): Promise<void> {
  const locationId = getLocationId();

  try {
    await makeGHLRequest(
      `/locations/${locationId}/opportunities/${opportunityId}`,
      "PUT",
      { status }
    );

    console.log(`[GoHighLevel] Updated opportunity ${opportunityId} status to: ${status}`);
  } catch (error) {
    console.error("[GoHighLevel] Failed to update opportunity status:", error);
    throw error;
  }
}
