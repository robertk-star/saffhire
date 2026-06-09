import { google } from "googleapis";

interface IntakeRow {
  timestamp: string;
  sessionId: string;
  companyName: string;
  dba: string;
  ein: string;
  businessType: string;
  businessEntity: string;
  ownerFirstName: string;
  ownerLastName: string;
  ownerPhone: string;
  ownerPhoneExt: string;
  ownerEmail: string;
  hasMainContact: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  contactPhoneExt: string;
  contactMobile: string;
  businessStreet: string;
  businessStreet2: string;
  businessCity: string;
  businessState: string;
  businessZip: string;
  businessCountry: string;
  sameAsBusiness: string;
  billingStreet: string;
  billingStreet2: string;
  billingCity: string;
  billingState: string;
  billingZip: string;
  billingCountry: string;
  billingAttention: string;
  adminUser1FirstName: string;
  adminUser1LastName: string;
  adminUser1JobTitle: string;
  adminUser1Mobile: string;
  adminUser1Email: string;
  adminUser2FirstName: string;
  adminUser2LastName: string;
  adminUser2JobTitle: string;
  adminUser2Mobile: string;
  adminUser2Email: string;
  adminUser3FirstName: string;
  adminUser3LastName: string;
  adminUser3JobTitle: string;
  adminUser3Mobile: string;
  adminUser3Email: string;
  authorizedSignerName: string;
  authorizedSignerTitle: string;
  signatureDate: string;
  signatureConfirmed: string;
  status: string;
  sectionCompleted: string;
  goHighLevelContactId: string;
}

// Column mapping for the Google Sheet - v2 (50 columns, matches test-sheets.mjs)
const COLUMN_HEADERS = [
  "timestamp",
  "sessionId",
  "companyName",
  "dba",
  "ein",
  "businessType",
  "businessEntity",
  "ownerFirstName",
  "ownerLastName",
  "ownerPhone",
  "ownerPhoneExt",
  "ownerEmail",
  "hasMainContact",
  "contactName",
  "contactEmail",
  "contactPhone",
  "contactPhoneExt",
  "contactMobile",
  "businessStreet",
  "businessStreet2",
  "businessCity",
  "businessState",
  "businessZip",
  "businessCountry",
  "sameAsBusiness",
  "billingStreet",
  "billingStreet2",
  "billingCity",
  "billingState",
  "billingZip",
  "billingCountry",
  "billingAttention",
  "adminUser1FirstName",
  "adminUser1LastName",
  "adminUser1JobTitle",
  "adminUser1Mobile",
  "adminUser1Email",
  "adminUser2FirstName",
  "adminUser2LastName",
  "adminUser2JobTitle",
  "adminUser2Mobile",
  "adminUser2Email",
  "adminUser3FirstName",
  "adminUser3LastName",
  "adminUser3JobTitle",
  "adminUser3Mobile",
  "adminUser3Email",
  "status",
  "sectionCompleted",
  "goHighLevelContactId",
];

function getAuthClient() {
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;

  if (!privateKey || !clientEmail) {
    console.error("[Google Sheets] Missing credentials - GOOGLE_SHEETS_PRIVATE_KEY or GOOGLE_SHEETS_CLIENT_EMAIL not set");
    throw new Error("Missing Google Sheets credentials");
  }

  try {
    return new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
  } catch (error) {
    console.error("[Google Sheets] Failed to create JWT auth client:", error);
    throw error;
  }
}

async function findRowBySessionId(sheets: any, spreadsheetId: string, sessionId: string): Promise<number | null> {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Sheet1!B:B", // Column B contains session IDs
    });

    const values = response.data.values || [];
    for (let i = 0; i < values.length; i++) {
      if (values[i][0] === sessionId) {
        return i + 1; // Google Sheets rows are 1-indexed
      }
    }
    return null;
  } catch (error) {
    console.error("[Google Sheets] Error finding row by session ID:", error);
    return null;
  }
}

async function getRowData(sheets: any, spreadsheetId: string, rowNumber: number): Promise<Record<string, string>> {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `Sheet1!A${rowNumber}:AQ${rowNumber}`,
    });

    const values = response.data.values?.[0] || [];
    const rowData: Record<string, string> = {};

    // Map values to column headers
    for (let i = 0; i < COLUMN_HEADERS.length && i < values.length; i++) {
      rowData[COLUMN_HEADERS[i]] = values[i] || "";
    }

    return rowData;
  } catch (error) {
    console.error("[Google Sheets] Error reading row data:", error);
    return {};
  }
}

export async function logIntakeToSheet(data: Partial<IntakeRow>): Promise<void> {
  try {
    console.log("[Google Sheets] logIntakeToSheet called with data:", { sessionId: data.sessionId, keys: Object.keys(data) });
    
    const auth = getAuthClient();
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

    if (!spreadsheetId) {
      console.error("[Google Sheets] Missing GOOGLE_SHEETS_SPREADSHEET_ID");
      throw new Error("Missing GOOGLE_SHEETS_SPREADSHEET_ID");
    }

    if (!data.sessionId) {
      console.error("[Google Sheets] Missing session ID");
      throw new Error("Missing session ID");
    }
    
    console.log("[Google Sheets] Auth client created, spreadsheet ID:", spreadsheetId);

    // Create sheets client with auth
    const sheets = google.sheets({ version: "v4", auth });

    // Find if this session already exists
    console.log("[Google Sheets] Looking for existing row for session:", data.sessionId);
    const existingRowNumber = await findRowBySessionId(sheets, spreadsheetId, data.sessionId);
    console.log("[Google Sheets] Found existing row number:", existingRowNumber);

    let mergedData: Record<string, string>;

    if (existingRowNumber) {
      // Read existing row data
      const existingData = await getRowData(sheets, spreadsheetId, existingRowNumber);
      console.log("[Google Sheets] Existing row data:", existingData);
      
      // Merge with new data (new data overwrites existing)
      mergedData = { ...existingData, ...data };
    } else {
      // New row - initialize with defaults
      mergedData = {
        timestamp: data.timestamp || new Date().toISOString(),
        sessionId: data.sessionId || "",
        ...data,
      };
    }

    // Build the row array in the correct column order
    const row = COLUMN_HEADERS.map(header => mergedData[header] || "");

    console.log("[Google Sheets] Final row data:", row.slice(0, 15)); // Log first 15 columns for debugging

    if (existingRowNumber) {
      // Update existing row
      const range = `Sheet1!A${existingRowNumber}:AQ${existingRowNumber}`;
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range,
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [row],
        },
      });
      console.log(`[Google Sheets] Updated existing row ${existingRowNumber} for session ${data.sessionId}`);
    } else {
      // Create new row
      const result = await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: "Sheet1!A:AQ",
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [row],
        },
      });
      console.log(`[Google Sheets] Created new row for session ${data.sessionId}. Updates: ${result.data.updates?.updatedRows}`);
    }
  } catch (error) {
    console.error("[Google Sheets] Error logging intake:", error instanceof Error ? error.message : error);
    // Don't throw - we don't want to fail the intake submission if sheets logging fails
  }
}

export async function updateIntakeStatus(sessionId: string, status: string, sectionCompleted?: string): Promise<void> {
  try {
    const auth = getAuthClient();
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

    if (!spreadsheetId) {
      throw new Error("Missing GOOGLE_SHEETS_SPREADSHEET_ID");
    }

    const sheets = google.sheets({ version: "v4", auth });

    // Find the row for this session
    const rowNumber = await findRowBySessionId(sheets, spreadsheetId, sessionId);
    if (!rowNumber) {
      console.warn(`[Google Sheets] No row found for session ${sessionId}`);
      return;
    }

    // Get existing row data
    const existingData = await getRowData(sheets, spreadsheetId, rowNumber);
    
    // Update status and section completed
    const mergedData: Record<string, string> = {
      ...existingData,
      status,
      sectionCompleted: sectionCompleted || existingData.sectionCompleted || "",
    };

    // Build the row array
    const row = COLUMN_HEADERS.map(header => mergedData[header] || "");

    // Update the row
    const range = `Sheet1!A${rowNumber}:AQ${rowNumber}`;
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [row],
      },
    });

    console.log(`[Google Sheets] Updated status for session ${sessionId}`);
  } catch (error) {
    console.error("[Google Sheets] Error updating intake status:", error instanceof Error ? error.message : error);
  }
}

export async function initializeSheet(): Promise<void> {
  try {
    const auth = getAuthClient();
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

    if (!spreadsheetId) {
      throw new Error("Missing GOOGLE_SHEETS_SPREADSHEET_ID");
    }

    const sheets = google.sheets({ version: "v4", auth });

    // Check if headers exist
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Sheet1!1:1",
    });

    const headers = response.data.values?.[0] || [];
    if (headers.length === 0) {
      // Add headers
      const headerRow = [
        "Timestamp",
        "Session ID",
        "Company Name",
        "DBA",
        "EIN",
        "Business Type",
        "Business Entity",
        "Owner First Name",
        "Owner Last Name",
        "Owner Phone",
        "Owner Phone Ext",
        "Owner Email",
        "Has Main Contact",
        "Contact Name",
        "Contact Email",
        "Contact Phone",
        "Contact Phone Ext",
        "Contact Mobile",
        "Business Street",
        "Business Street 2",
        "Business City",
        "Business State",
        "Business Zip",
        "Business Country",
        "Same as Business",
        "Billing Street",
        "Billing Street 2",
        "Billing City",
        "Billing State",
        "Billing Zip",
        "Billing Country",
        "Billing Attention",
        "Admin User 1 First Name",
        "Admin User 1 Last Name",
        "Admin User 1 Job Title",
        "Admin User 1 Mobile",
        "Admin User 1 Email",
        "Admin User 2 First Name",
        "Admin User 2 Last Name",
        "Admin User 2 Job Title",
        "Admin User 2 Mobile",
        "Admin User 2 Email",
        "Admin User 3 First Name",
        "Admin User 3 Last Name",
        "Admin User 3 Job Title",
        "Admin User 3 Mobile",
        "Admin User 3 Email",
        "Status",
        "Section Completed",
        "GoHighLevel Contact ID",
      ];

      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: "Sheet1!1:1",
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [headerRow],
        },
      });

      console.log("[Google Sheets] Initialized sheet with headers");
    }
  } catch (error) {
    console.error("[Google Sheets] Error initializing sheet:", error instanceof Error ? error.message : error);
  }
}
