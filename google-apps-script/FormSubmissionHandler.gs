const SECRET_KEY = "barbershop_secret_2026";
const NOTIFY_EMAIL = "thebarbershop114@gmail.com";

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return createResponse({ error: "No data received" });
    }

    const payload = JSON.parse(e.postData.contents);
    Logger.log("Received: " + JSON.stringify(payload));

    if (payload.secret !== SECRET_KEY) {
      return createResponse({ error: "Unauthorized" });
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();

    if (payload.type === "appointment") {
      const sheet = ss.getSheetByName("Appointment");
      sheet.appendRow([
        new Date(),
        payload.fullName,
        payload.phone,
        payload.branch,
        payload.date,
        payload.time
      ]);
    } else if (payload.type === "franchise") {
      const sheet = ss.getSheetByName("Franchise");
      sheet.appendRow([
        new Date(),
        payload.fullName,
        payload.email,
        payload.phone,
        payload.city,
        payload.occupation,
        payload.investment,
        payload.message
      ]);
    } else {
      return createResponse({ error: "Invalid type" });
    }

    return createResponse({ success: true });

  } catch (err) {
    Logger.log("Error: " + err.message);
    return createResponse({ error: err.message });
  }
}

function createResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

