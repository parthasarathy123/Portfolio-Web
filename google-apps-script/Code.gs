function doPost(event) {
  try {
    const payload = JSON.parse(event.postData.contents || "{}");
    const properties = PropertiesService.getScriptProperties();
    const expectedSecret = properties.getProperty("CONTACT_FORM_SECRET");
    const notificationEmail = properties.getProperty("NOTIFICATION_EMAIL");

    if (!expectedSecret || !notificationEmail || payload.secret !== expectedSecret) {
      return respond({ ok: false });
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Received at", "Name", "Company", "Email", "Message"]);
    }

    sheet.appendRow([
      payload.receivedAt || new Date().toISOString(),
      payload.name || "",
      payload.company || "",
      payload.email || "",
      payload.message || "",
    ]);

    MailApp.sendEmail({
      to: notificationEmail,
      subject: "New portfolio contact: " + (payload.name || "Website visitor"),
      body:
        "Name: " + (payload.name || "") + "\n" +
        "Company: " + (payload.company || "") + "\n" +
        "Email: " + (payload.email || "") + "\n\n" +
        "Message:\n" + (payload.message || ""),
      htmlBody:
        "<p><strong>Name:</strong> " + escapeHtml(payload.name) + "</p>" +
        "<p><strong>Company:</strong> " + escapeHtml(payload.company) + "</p>" +
        "<p><strong>Email:</strong> " + escapeHtml(payload.email) + "</p>" +
        "<p><strong>Message:</strong><br>" + escapeHtml(payload.message).replace(/\n/g, "<br>") + "</p>",
    });

    return respond({ ok: true });
  } catch (error) {
    return respond({ ok: false });
  }
}

function respond(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
