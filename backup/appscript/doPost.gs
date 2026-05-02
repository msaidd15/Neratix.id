/**
 * Neratix Form Handler
 * Backup file for Google Apps Script Web App.
 */
function doPost(e) {
  try {
    const data = e && e.parameter ? e.parameter : {};

    // source dari form:
    // - source=langsung -> daftar langsung
    // - source=demo|trial|coba_gratis -> coba gratis
    const source = String(data.source || "").toLowerCase().trim();
    const isDemo = source === "demo" || source === "trial" || source === "coba_gratis";

    // sheet tujuan
    const sheetName = isDemo ? "DEMO" : "DAFTAR LANGSUNG";

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(sheetName);

    if (!sheet) {
      return ContentService
        .createTextOutput('error: sheet "' + sheetName + '" tidak ditemukan')
        .setMimeType(ContentService.MimeType.TEXT);
    }

    // numbering: asumsi row 1 header
    const lastRow = sheet.getLastRow();
    const no = Math.max(1, lastRow);

    const tanggal = new Date();
    const nama = data.nama || "";
    const umur = data.umur || "";
    const email = data.email || "";
    const hp = data.hp || "";
    const programCategory = data.program_category || "-";
    const program = data.program || "";
    const kodeReferral = data.kode_referral || "-";

    // Simpan ke sheet.
    // Kolom yang dipakai (disarankan):
    // No | Tanggal | Nama | Umur | Email | HP | Bidang | Program | Kode Referral | Source
    sheet.appendRow([
      no,
      tanggal,
      nama,
      umur,
      email,
      hp,
      programCategory,
      program,
      kodeReferral,
      source || "-",
    ]);

    const sourceLabel = isDemo ? "Coba Gratis / Demo" : "Daftar Langsung";
    const bidangLabel = programCategory === "robotic"
      ? "Robotic Class"
      : programCategory === "coding"
      ? "Tech & Coding Class"
      : programCategory;

    MailApp.sendEmail({
      to: "msaidd15@gmail.com",
      subject: isDemo ? "COBA GRATIS / DEMO - NERATIX" : "DAFTAR LANGSUNG - NERATIX",
      htmlBody:
        '<div style="font-family: Arial; padding: 15px;">' +
          '<h2 style="color:#10b981;">Permintaan ' + sourceLabel + '</h2>' +
          '<hr>' +
          '<p><b>Sheet:</b> ' + sheetName + '</p>' +
          '<p><b>No:</b> ' + no + '</p>' +
          '<p><b>Tanggal:</b> ' + tanggal + '</p>' +
          '<p><b>Nama:</b> ' + (nama || "-") + '</p>' +
          '<p><b>Umur:</b> ' + (umur || "-") + '</p>' +
          '<p><b>Email:</b> ' + (email || "-") + '</p>' +
          '<p><b>No HP / WA:</b> ' + (hp || "-") + '</p>' +
          '<p><b>Bidang:</b> ' + (bidangLabel || "-") + '</p>' +
          '<p><b>Program:</b> ' + (program || "-") + '</p>' +
          '<p><b>Kode Referral:</b> ' + kodeReferral + '</p>' +
          '<p><b>Source:</b> ' + (source || "-") + '</p>' +
          '<hr>' +
          '<p style="color: gray;">Notifikasi otomatis dari sistem Neratix</p>' +
        '</div>',
    });

    return ContentService
      .createTextOutput("success")
      .setMimeType(ContentService.MimeType.TEXT);
  } catch (err) {
    return ContentService
      .createTextOutput("error: " + err.message)
      .setMimeType(ContentService.MimeType.TEXT);
  }
}
