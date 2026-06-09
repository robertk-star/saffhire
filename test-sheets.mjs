import { google } from "googleapis";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, ".env") });

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
const CLIENT_EMAIL = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
const PRIVATE_KEY = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n");

console.log("Spreadsheet ID:", SPREADSHEET_ID);
console.log("Client Email:", CLIENT_EMAIL);
console.log("Private Key present:", !!PRIVATE_KEY);

const auth = new google.auth.JWT({
  email: CLIENT_EMAIL,
  key: PRIVATE_KEY,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

// Step 1: Clear the sheet
console.log("\n--- Clearing sheet ---");
await sheets.spreadsheets.values.clear({
  spreadsheetId: SPREADSHEET_ID,
  range: "Sheet1",
});
console.log("Sheet cleared.");

// Step 2: Write headers in row 1
const headers = [
  "Timestamp", "Session ID", "Company Name", "DBA", "EIN",
  "Business Type", "Business Entity", "Owner First Name", "Owner Last Name",
  "Owner Phone", "Owner Phone Ext", "Owner Email",
  "Has Main Contact", "Contact Name", "Contact Email", "Contact Phone",
  "Contact Phone Ext", "Contact Mobile",
  "Business Street", "Business Street 2", "Business City", "Business State",
  "Business Zip", "Business Country",
  "Same as Business", "Billing Street", "Billing Street 2", "Billing City",
  "Billing State", "Billing Zip", "Billing Country", "Billing Attention",
  "Admin 1 First Name", "Admin 1 Last Name", "Admin 1 Job Title",
  "Admin 1 Mobile", "Admin 1 Email",
  "Admin 2 First Name", "Admin 2 Last Name", "Admin 2 Job Title",
  "Admin 2 Mobile", "Admin 2 Email",
  "Admin 3 First Name", "Admin 3 Last Name", "Admin 3 Job Title",
  "Admin 3 Mobile", "Admin 3 Email",
  "Status", "Section Completed", "GoHighLevel Contact ID"
];

await sheets.spreadsheets.values.update({
  spreadsheetId: SPREADSHEET_ID,
  range: "Sheet1!A1",
  valueInputOption: "USER_ENTERED",
  requestBody: { values: [headers] },
});
console.log("Headers written:", headers.length, "columns");

// Step 3: Write a test data row
const testRow = [
  new Date().toISOString(),         // A: Timestamp
  "test-session-123",               // B: Session ID
  "Test Company LLC",               // C: Company Name
  "Test DBA",                       // D: DBA
  "12-3456789",                     // E: EIN
  "Technology",                     // F: Business Type
  "LLC",                            // G: Business Entity
  "John",                           // H: Owner First Name
  "Doe",                            // I: Owner Last Name
  "555-123-4567",                   // J: Owner Phone
  "",                               // K: Owner Phone Ext
  "john@test.com",                  // L: Owner Email
  "true",                           // M: Has Main Contact
  "Jane Smith",                     // N: Contact Name
  "jane@test.com",                  // O: Contact Email
  "555-987-6543",                   // P: Contact Phone
  "",                               // Q: Contact Phone Ext
  "555-111-2222",                   // R: Contact Mobile
  "123 Main St",                    // S: Business Street
  "Suite 100",                      // T: Business Street 2
  "New York",                       // U: Business City
  "NY",                             // V: Business State
  "10001",                          // W: Business Zip
  "USA",                            // X: Business Country
  "false",                          // Y: Same as Business
  "456 Billing Ave",                // Z: Billing Street
  "",                               // AA: Billing Street 2
  "Los Angeles",                    // AB: Billing City
  "CA",                             // AC: Billing State
  "90001",                          // AD: Billing Zip
  "USA",                            // AE: Billing Country
  "Accounts Payable",               // AF: Billing Attention
  "Bob",                            // AG: Admin 1 First Name
  "Johnson",                        // AH: Admin 1 Last Name
  "HR Manager",                     // AI: Admin 1 Job Title
  "555-333-4444",                   // AJ: Admin 1 Mobile
  "bob@test.com",                   // AK: Admin 1 Email
  "", "", "", "", "",               // Admin 2 (empty)
  "", "", "", "", "",               // Admin 3 (empty)
  "In Progress",                    // Status
  "client-info",                    // Section Completed
  "",                               // GoHighLevel Contact ID
];

await sheets.spreadsheets.values.append({
  spreadsheetId: SPREADSHEET_ID,
  range: "Sheet1!A:AW",
  valueInputOption: "USER_ENTERED",
  requestBody: { values: [testRow] },
});

console.log("\nTest row written with", testRow.length, "columns");
console.log("\n✅ SUCCESS - Check your Google Sheet now!");
console.log("Row 1 = Headers");
console.log("Row 2 = Test data");
