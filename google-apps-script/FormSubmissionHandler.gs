const SECRET_KEY = "barbershop_secret_2026"; // same as frontend

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);

    if (payload.secret !== SECRET_KEY) {
      return json({ error: "Unauthorized" });
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const data = payload.data; // Extract the nested data object

    if (payload.type === "appointment") {
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

    if (payload.type === "franchise") {
      const sheet = ss.getSheetByName("Franchise");
      sheet.appendRow([
        new Date(),
        data.fullName,
        data.email,
        data.phone,
        data.city,
        data.occupation,
        data.investment,
        data.message || ""
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
