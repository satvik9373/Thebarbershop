const SECRET_KEY = "barbershop_secret_2026";

function doPost(e) {
  try {
    // Check if event object exists
    if (!e || !e.postData || !e.postData.contents) {
      return json({ error: "Invalid request - no data received" });
    }

    const payload = JSON.parse(e.postData.contents);
    
    // Log for debugging
    Logger.log("Received payload: " + JSON.stringify(payload));

    if (payload.secret !== SECRET_KEY) {
      return json({ error: "Unauthorized" });
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const formData = payload.data || {}; // Get nested data

    if (payload.type === "appointment") {
      const sheet = ss.getSheetByName("Appointment");
      
      // Log what we're writing
      Logger.log("Writing appointment: " + JSON.stringify(formData));
      
      sheet.appendRow([
        new Date(),
        formData.fullName || "",
        formData.phone || "",
        formData.branch || "",
        formData.date || "",
        formData.timeSlot || ""
      ]);
    }

    if (payload.type === "franchise") {
      const sheet = ss.getSheetByName("Franchise");
      
      sheet.appendRow([
        new Date(),
        formData.fullName || "",
        formData.email || "",
        formData.phone || "",
        formData.city || "",
        formData.occupation || "",
        formData.investment || "",
        formData.message || ""
      ]);
    }

    return json({ success: true });

  } catch (err) {
    Logger.log("Error: " + err.message);
    return json({ error: err.message });
  }
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
