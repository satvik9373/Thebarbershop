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
    
    // Check if data is nested or at root level
    const formData = payload.data || payload; // Try nested first, then root
    
    Logger.log("Form data being used: " + JSON.stringify(formData));

    if (payload.type === "appointment") {
      const sheet = ss.getSheetByName("Appointment");
      
      sheet.appendRow([
        new Date(),
        formData.fullName || "MISSING",
        formData.phone || "MISSING",
        formData.branch || "MISSING",
        formData.date || "MISSING",
        formData.timeSlot || "MISSING"
      ]);
    }

    if (payload.type === "franchise") {
      const sheet = ss.getSheetByName("Franchise");
      
      sheet.appendRow([
        new Date(),
        formData.fullName || "MISSING",
        formData.email || "MISSING",
        formData.phone || "MISSING",
        formData.city || "MISSING",
        formData.occupation || "MISSING",
        formData.investment || "MISSING",
        formData.message || "MISSING"
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
