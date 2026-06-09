// ============================================================
// SaffHire Intake Form - Google Apps Script Web Endpoint
// ============================================================
// SETUP INSTRUCTIONS:
// 1. Open your Google Sheet
// 2. Click Extensions → Apps Script
// 3. Delete all existing code
// 4. Paste this entire script
// 5. Click Save (disk icon)
// 6. Click Deploy → New Deployment
// 7. Type: Web App
// 8. Execute as: Me
// 9. Who has access: Anyone
// 10. Click Deploy → Copy the Web App URL
// 11. Paste the URL into the Manus project (see below)
// ============================================================

const SHEET_NAME = "Sheet1";
const NOTIFICATION_EMAIL = "robertk@saffhire.com";

const COLUMNS = [
  { key: "timestamp",             header: "Timestamp" },
  { key: "sessionId",             header: "Session ID" },
  { key: "companyName",           header: "Company Name" },
  { key: "dba",                   header: "DBA" },
  { key: "ein",                   header: "EIN" },
  { key: "businessType",          header: "Business Type" },
  { key: "businessEntity",        header: "Business Entity (LLC, Inc, etc.)" },
  { key: "ownerFirstName",        header: "Owner First Name" },
  { key: "ownerLastName",         header: "Owner Last Name" },
  { key: "ownerPhone",            header: "Owner Phone" },
  { key: "ownerPhoneExt",         header: "Owner Phone Ext" },
  { key: "ownerEmail",            header: "Owner Email" },
  { key: "hasMainContact",        header: "Has Main Contact (Yes/No)" },
  { key: "contactName",           header: "Contact Name" },
  { key: "contactEmail",          header: "Contact Email" },
  { key: "contactPhone",          header: "Contact Phone" },
  { key: "contactPhoneExt",       header: "Contact Phone Ext" },
  { key: "contactMobile",         header: "Contact Mobile" },
  { key: "businessStreet",        header: "Business Street" },
  { key: "businessStreet2",       header: "Business Street 2" },
  { key: "businessCity",          header: "Business City" },
  { key: "businessState",         header: "Business State" },
  { key: "businessZip",           header: "Business Zip" },
  { key: "businessCountry",       header: "Business Country" },
  { key: "sameAsBusiness",        header: "Same as Business Address" },
  { key: "billingStreet",         header: "Billing Street" },
  { key: "billingStreet2",        header: "Billing Street 2" },
  { key: "billingCity",           header: "Billing City" },
  { key: "billingState",          header: "Billing State" },
  { key: "billingZip",            header: "Billing Zip" },
  { key: "billingCountry",        header: "Billing Country" },
  { key: "billingAttention",      header: "Billing Attention" },
  { key: "adminUser1FirstName",   header: "Admin 1 First Name" },
  { key: "adminUser1LastName",    header: "Admin 1 Last Name" },
  { key: "adminUser1JobTitle",    header: "Admin 1 Job Title" },
  { key: "adminUser1Mobile",      header: "Admin 1 Mobile" },
  { key: "adminUser1Email",       header: "Admin 1 Email" },
  { key: "adminUser2FirstName",   header: "Admin 2 First Name" },
  { key: "adminUser2LastName",    header: "Admin 2 Last Name" },
  { key: "adminUser2JobTitle",    header: "Admin 2 Job Title" },
  { key: "adminUser2Mobile",      header: "Admin 2 Mobile" },
  { key: "adminUser2Email",       header: "Admin 2 Email" },
  { key: "adminUser3FirstName",   header: "Admin 3 First Name" },
  { key: "adminUser3LastName",    header: "Admin 3 Last Name" },
  { key: "adminUser3JobTitle",    header: "Admin 3 Job Title" },
  { key: "adminUser3Mobile",      header: "Admin 3 Mobile" },
  { key: "adminUser3Email",       header: "Admin 3 Email" },
  { key: "status",                header: "Status" },
  { key: "sectionCompleted",      header: "Section Completed" },
  { key: "goHighLevelContactId",  header: "GoHighLevel Contact ID" },
];

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok", message: "SaffHire Intake endpoint is live" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.getActiveSheet();

    // Ensure headers exist in row 1
    ensureHeaders(sheet);

    const sessionId = data.sessionId;
    if (!sessionId) {
      return jsonResponse({ success: false, error: "Missing sessionId" });
    }

    // Find existing row for this session
    const existingRow = findRowBySessionId(sheet, sessionId);

    if (existingRow) {
      // Update existing row - only overwrite non-empty incoming values
      const existingValues = sheet.getRange(existingRow, 1, 1, COLUMNS.length).getValues()[0];
      const updatedRow = COLUMNS.map((col, i) => {
        const incoming = data[col.key];
        // Keep existing value if incoming is empty/undefined
        return (incoming !== undefined && incoming !== "") ? incoming : (existingValues[i] || "");
      });
      sheet.getRange(existingRow, 1, 1, COLUMNS.length).setValues([updatedRow]);
    } else {
      // Append new row
      const newRow = COLUMNS.map(col => data[col.key] !== undefined ? data[col.key] : "");
      sheet.appendRow(newRow);
    }

    // Send email notification when status is "Completed"
    if (data.status === "Completed" && data.companyName) {
      sendCompletionEmail(data);
    }

    return jsonResponse({ success: true, sessionId });

  } catch (err) {
    return jsonResponse({ success: false, error: err.toString() });
  }
}

function sendCompletionEmail(data) {
  try {
    const company = data.companyName || "Unknown Company";
    const owner = ((data.ownerFirstName || "") + " " + (data.ownerLastName || "")).trim();
    const subject = "New Account Setup Request: " + company;

    let body = "A new client has completed the SaffHire account setup form.\n\n";
    body += "=== CLIENT INFORMATION ===\n";
    if (data.companyName)    body += "Company: " + data.companyName + "\n";
    if (data.dba)            body += "DBA: " + data.dba + "\n";
    if (data.ein)            body += "EIN: " + data.ein + "\n";
    if (data.businessType)   body += "Business Type: " + data.businessType + "\n";
    if (data.businessEntity) body += "Business Entity: " + data.businessEntity + "\n";
    if (owner)               body += "Owner: " + owner + "\n";
    if (data.ownerPhone)     body += "Owner Phone: " + data.ownerPhone + "\n";
    if (data.ownerEmail)     body += "Owner Email: " + data.ownerEmail + "\n";

    if (data.hasMainContact === "true" || data.hasMainContact === true) {
      body += "\n=== CONTACT INFORMATION ===\n";
      if (data.contactName)  body += "Contact Name: " + data.contactName + "\n";
      if (data.contactEmail) body += "Contact Email: " + data.contactEmail + "\n";
      if (data.contactPhone) body += "Contact Phone: " + data.contactPhone + "\n";
    }

    body += "\n=== BUSINESS ADDRESS ===\n";
    if (data.businessStreet)  body += "Street: " + data.businessStreet + (data.businessStreet2 ? " " + data.businessStreet2 : "") + "\n";
    if (data.businessCity)    body += "City: " + data.businessCity + "\n";
    if (data.businessState)   body += "State: " + data.businessState + "\n";
    if (data.businessZip)     body += "Zip: " + data.businessZip + "\n";
    if (data.businessCountry) body += "Country: " + data.businessCountry + "\n";

    body += "\n=== ADMIN USERS ===\n";
    for (let i = 1; i <= 3; i++) {
      const fn = data["adminUser" + i + "FirstName"];
      const ln = data["adminUser" + i + "LastName"];
      const jt = data["adminUser" + i + "JobTitle"];
      const mb = data["adminUser" + i + "Mobile"];
      const em = data["adminUser" + i + "Email"];
      if (fn || em) {
        body += "\nAdmin User " + i + ":\n";
        if (fn || ln) body += "  Name: " + (fn || "") + " " + (ln || "") + "\n";
        if (jt)       body += "  Job Title: " + jt + "\n";
        if (mb)       body += "  Mobile: " + mb + "\n";
        if (em)       body += "  Email: " + em + "\n";
      }
    }

    body += "\n=== TRACKING ===\n";
    body += "Session ID: " + (data.sessionId || "N/A") + "\n";
    body += "Submitted: " + (data.timestamp || new Date().toISOString()) + "\n";
    body += "\nView in Google Sheets: https://docs.google.com/spreadsheets/d/1oPzzSUw47H8sXE0P7-vsJo9m0syTRyWSR_jFpkvS-Wo\n";

    MailApp.sendEmail({
      to: NOTIFICATION_EMAIL,
      subject: subject,
      body: body
    });

    Logger.log("Notification email sent to " + NOTIFICATION_EMAIL + " for " + company);
  } catch (emailErr) {
    Logger.log("Failed to send notification email: " + emailErr.toString());
  }
}

function ensureHeaders(sheet) {
  const firstRow = sheet.getRange(1, 1, 1, COLUMNS.length).getValues()[0];
  // Check if headers are already set
  if (firstRow[0] === "Timestamp") return;

  // Write headers
  const headers = COLUMNS.map(col => col.header);
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
  sheet.setFrozenRows(1);
}

function findRowBySessionId(sheet, sessionId) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return null;

  // Session ID is in column 2 (index 1)
  const sessionIds = sheet.getRange(2, 2, lastRow - 1, 1).getValues();
  for (let i = 0; i < sessionIds.length; i++) {
    if (sessionIds[i][0] === sessionId) {
      return i + 2; // +2 because we start at row 2 and arrays are 0-indexed
    }
  }
  return null;
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
