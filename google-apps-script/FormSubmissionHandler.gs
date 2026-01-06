const SECRET_KEY = "YOUR_SECRET_KEY"; // same as frontend

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    if (data.secret !== SECRET_KEY) {
      return json({ error: "Unauthorized" });
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();

    if (data.type === "appointment") {
      const sheet = ss.getSheetByName("Appointment");
      sheet.appendRow([
        new Date(),
        data.fullName,
        data.phone,
        data.branch,
        data.date,
        data.timeSlot
      ]);
    }

    if (data.type === "franchise") {
      const sheet = ss.getSheetByName("Franchise");
      sheet.appendRow([
        new Date(),
        data.fullName,
        data.email,
        data.phone,
        data.city,
        data.occupation,
        data.budget,
        data.reason || ""
      ]);
    }

    return json({ success: true });

  } catch (err) {
    return json({ error: err.message });
  }
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
