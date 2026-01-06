const SECRET_KEY = "barbershop_secret_2026";
const NOTIFY_EMAILS = [
  "thebarbershop114@gmail.com",
  "Satvikchaturvedi8989@gmail.com"
];

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
    let emailBody = "";

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
      
      emailBody = `
        <h2>🧔 New Appointment Booking</h2>
        <p><strong>Name:</strong> ${payload.fullName}</p>
        <p><strong>Phone:</strong> ${payload.phone}</p>
        <p><strong>Branch:</strong> ${payload.branch}</p>
        <p><strong>Date:</strong> ${payload.date}</p>
        <p><strong>Time:</strong> ${payload.time}</p>
        <hr>
        <p><em>Submitted at: ${new Date().toLocaleString()}</em></p>
      `;
      
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
      
      emailBody = `
        <h2>🚀 New Franchise Enquiry</h2>
        <p><strong>Name:</strong> ${payload.fullName}</p>
        <p><strong>Email:</strong> ${payload.email}</p>
        <p><strong>Phone:</strong> ${payload.phone}</p>
        <p><strong>City:</strong> ${payload.city}</p>
        <p><strong>Occupation:</strong> ${payload.occupation}</p>
        <p><strong>Investment:</strong> ${payload.investment}</p>
        <p><strong>Message:</strong> ${payload.message}</p>
        <hr>
        <p><em>Submitted at: ${new Date().toLocaleString()}</em></p>
      `;
      
    } else {
      return createResponse({ error: "Invalid type" });
    }

    // Send email notification
    MailApp.sendEmail({
      to: NOTIFY_EMAILS.join(","),
      subject: "🧔 New Appointment / Franchise Submission",
      htmlBody: emailBody,
    });

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

