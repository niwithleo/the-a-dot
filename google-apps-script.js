/**
 * THE A-DOT — Google Apps Script order logger
 *
 * HOW TO SET UP (one time):
 *
 * 1. Go to sheets.google.com and create a new sheet.
 *    Rename it "Orders" (or anything — it'll auto-create a tab).
 *
 * 2. Inside the sheet, click  Extensions → Apps Script
 *
 * 3. Delete all the default code in the editor and paste
 *    the entire contents of this file.
 *
 * 4. Click the floppy-disk icon (Save). Name the project anything
 *    (e.g. "The A-Dot Orders").
 *
 * 5. Click  Deploy → New deployment
 *    - Click the gear icon next to "Type" → choose  Web app
 *    - Description: "Order logger"
 *    - Execute as: Me
 *    - Who has access: Anyone
 *    - Click  Deploy
 *    - Google will ask you to authorize — click through it.
 *
 * 6. Copy the  Web app URL  that appears (looks like
 *    https://script.google.com/macros/s/XXXX.../exec)
 *
 * 7. Open  app.js  in this repo, find CONFIG at the top, and
 *    paste the URL as the value of  sheetEndpoint.
 *
 * 8. Save app.js, commit, and push.
 *    Orders will now appear in the sheet automatically.
 *
 * SHEET COLUMNS (auto-created on first order):
 *   Timestamp | Order Code | Name | Phone | Items | Total | Pay Method | Status
 *
 * Update "Status" manually as orders progress:
 *   Pending → Confirmed → Baked → Picked Up
 */

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss    = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('Orders') || ss.getSheets()[0];

    // Write header row the very first time
    if (sheet.getLastRow() === 0) {
      const headers = ['Timestamp','Order Code','Name','Phone','Items','Total','Pay Method','Status'];
      sheet.appendRow(headers);
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#2A1A12');
      headerRange.setFontColor('#FFFFFF');
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      Utilities.formatDate(new Date(), 'America/New_York', 'MM/dd/yyyy HH:mm:ss'),
      data.code,
      data.name,
      data.phone,
      data.items,
      '$' + data.total,
      data.payMethod,
      'Pending',
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
