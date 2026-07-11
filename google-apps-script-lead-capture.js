const SHEET_NAME = "Leads";

function doPost(event) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const payload = JSON.parse(event.postData.contents || "{}");

  sheet.appendRow([
    payload.createdAt || new Date().toISOString(),
    payload.name || "",
    payload.email || "",
    payload.organization || "",
    payload.interest || "",
    payload.freeTrial || "No",
    payload.message || "",
    payload.sourcePage || "",
    "New",
    "",
    payload.profile || "",
    payload.consent || "No",
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
