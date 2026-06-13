function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("Orders") || ss.getSheets()[0];

    if (sheet.getLastRow() === 0) {
      var headers = ["Timestamp","Order Code","Name","Phone","Items","Total","Pay Method","Status"];
      sheet.appendRow(headers);
      var hr = sheet.getRange(1, 1, 1, headers.length);
      hr.setFontWeight("bold");
      hr.setBackground("#2A1A12");
      hr.setFontColor("#FFFFFF");
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      Utilities.formatDate(new Date(), "America/New_York", "MM/dd/yyyy HH:mm:ss"),
      data.code,
      data.name,
      data.phone,
      data.items,
      "$" + data.total,
      data.payMethod,
      "Pending"
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ok: true}))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ok: false, error: err.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
