/**
 * @OnlyCurrentDoc
 *
 * Goel Designs — website brief receiver (Google Apps Script)
 *
 * The website's "Send" button POSTs each project brief here. This script:
 *   1. adds a row to the "Briefs" tab of this Google Sheet,
 *   2. emails the brief to the studio (NOTIFY_TO), with Reply-To set to the client,
 *   3. emails the client a copy of their brief (SEND_CLIENT_COPY).
 *
 * Setup (once): see google-apps-script/README.md
 *   Extensions → Apps Script → paste this file → run setup() → Deploy → Web app
 *   (Execute as: Me · Who has access: Anyone) → copy the /exec URL into the site's
 *   NEXT_PUBLIC_BRIEF_ENDPOINT.
 */

const CONFIG = {
  SHEET_NAME: "Briefs",
  NOTIFY_TO: "info@goeldesigns.com", // where new briefs are emailed (comma-separate for more)
  SEND_CLIENT_COPY: true, // email the client a copy of what they sent
  STUDIO_NAME: "Goel Designs",
  STUDIO_EMAIL: "info@goeldesigns.com",
  STUDIO_PHONE: "+91 9368207505",
  STUDIO_WHATSAPP: "919368207505",
  STUDIO_SITE: "https://www.goeldesigns.com",
  TIMEZONE: "Asia/Kolkata",
  BRAND: "#5040d0",
  MIN_FILL_MS: 3000, // faster than this is a bot
};

const COLUMNS = [
  ["Received", 160],
  ["Name", 160],
  ["Email", 220],
  ["Phone / WhatsApp", 150],
  ["Company / brand", 170],
  ["Services", 260],
  ["Budget", 110],
  ["Timeline", 150],
  ["About the project", 380],
  ["Page", 200],
  ["Status", 110],
];
const STATUSES = ["New", "Contacted", "Quoted", "Won", "Lost"];

/* ───────────────────────── Web app entry points ───────────────────────── */

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || "{}");

    // Spam: the hidden "website" field is never filled by people, and nobody
    // completes the three-step form in under a few seconds.
    if (data.website || Number(data.elapsedMs) < CONFIG.MIN_FILL_MS) return json_({ ok: true });

    const brief = clean_(data);
    const problem = validate_(brief);
    if (problem) return json_({ ok: false, error: problem });

    lock.waitLock(10000);
    const sheet = getSheet_();
    sheet.appendRow(
      [
        new Date(),
        brief.name,
        brief.email,
        brief.phone,
        brief.company,
        brief.services.join(", "),
        brief.budget,
        brief.timeline,
        brief.details,
        brief.page,
        "New",
      ].map(safeCell_),
    );
    const rowNumber = sheet.getLastRow();
    lock.releaseLock();

    const sheetUrl = sheet.getParent().getUrl() + "#gid=" + sheet.getSheetId();
    let emailed = false;
    let copySent = false;
    try {
      notifyStudio_(brief, rowNumber, sheetUrl);
      emailed = true;
    } catch (err) {
      console.error("Studio email failed", err);
    }
    if (CONFIG.SEND_CLIENT_COPY) {
      try {
        sendClientCopy_(brief);
        copySent = true;
      } catch (err) {
        console.error("Client copy failed", err);
      }
    }
    return json_({ ok: true, row: rowNumber, emailed: emailed, copySent: copySent });
  } catch (err) {
    console.error(err);
    return json_({ ok: false, error: "Something went wrong on our side. Please try again, or send it on WhatsApp." });
  } finally {
    try {
      lock.releaseLock();
    } catch (_) {}
  }
}

// Visiting the /exec URL in a browser just confirms the deployment is live.
function doGet() {
  return json_({ ok: true, service: CONFIG.STUDIO_NAME + " brief receiver" });
}

/* ───────────────────────── Run these from the editor ───────────────────────── */

/** Run once after pasting: creates and formats the Briefs tab and asks for permissions. */
function setup() {
  getSheet_();
  console.log("Briefs tab ready. Emails left today: " + MailApp.getRemainingDailyQuota());
}

/** Optional: adds a sample row and sends both emails, so you can see the result. */
function sendTestBrief() {
  const result = doPost({
    postData: {
      contents: JSON.stringify({
        name: "Test Client",
        email: CONFIG.NOTIFY_TO.split(",")[0].trim(),
        phone: "98765 43210",
        company: "Test Café",
        services: ["UI/UX design", "Development"],
        budget: "₹50K–2L",
        timeline: "1–2 months",
        details: "This is a test brief sent from the Apps Script editor.",
        page: CONFIG.STUDIO_SITE,
        elapsedMs: 60000,
      }),
    },
  });
  console.log(result.getContent());
}

/* ───────────────────────── Sheet ───────────────────────── */

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(CONFIG.SHEET_NAME, 0);
  if (sheet.getLastRow() === 0) formatSheet_(ss, sheet);
  return sheet;
}

function formatSheet_(ss, sheet) {
  ss.setSpreadsheetTimeZone(CONFIG.TIMEZONE);
  const header = sheet.getRange(1, 1, 1, COLUMNS.length);
  header
    .setValues([COLUMNS.map((c) => c[0])])
    .setFontWeight("bold")
    .setFontColor("#ffffff")
    .setBackground(CONFIG.BRAND)
    .setVerticalAlignment("middle");
  sheet.setRowHeight(1, 32);
  sheet.setFrozenRows(1);
  COLUMNS.forEach((c, i) => sheet.setColumnWidth(i + 1, c[1]));
  sheet.getRange("A2:A").setNumberFormat("d mmm yyyy, h:mm am/pm");
  sheet.getRange("I2:I").setWrap(true);
  sheet.getRange("A2:K").setVerticalAlignment("top");
  sheet
    .getRange("K2:K")
    .setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(STATUSES, true).setAllowInvalid(false).build());
}

/* ───────────────────────── Emails ───────────────────────── */

function notifyStudio_(b, rowNumber, sheetUrl) {
  const subject = "New project enquiry — " + b.name + (b.company ? " (" + b.company + ")" : "");
  const waDigits = waDigits_(b.phone);
  const actions = [
    { label: "Reply by email", href: "mailto:" + b.email },
    { label: "WhatsApp " + firstName_(b.name), href: "https://wa.me/" + waDigits },
    { label: "Open the sheet", href: sheetUrl },
  ];
  MailApp.sendEmail({
    to: CONFIG.NOTIFY_TO,
    subject: subject,
    replyTo: b.email,
    name: CONFIG.STUDIO_NAME + " website",
    body: plainBrief_(b, "New project enquiry from " + CONFIG.STUDIO_SITE + " (row " + rowNumber + " in the Briefs sheet)"),
    htmlBody: emailHtml_({
      eyebrow: "New project enquiry",
      title: b.name + (b.company ? " · " + b.company : ""),
      intro: "Sent from the brief builder on the website. Hit reply to answer " + firstName_(b.name) + " directly.",
      brief: b,
      actions: actions,
      footer: "Row " + rowNumber + " in the Briefs sheet · status set to “New”.",
    }),
  });
}

function sendClientCopy_(b) {
  const first = firstName_(b.name);
  MailApp.sendEmail({
    to: b.email,
    subject: "We’ve got your brief — " + CONFIG.STUDIO_NAME,
    replyTo: CONFIG.STUDIO_EMAIL,
    name: CONFIG.STUDIO_NAME,
    body: plainBrief_(
      b,
      "Hi " + first + ", thanks for telling us about your project. Here’s a copy of your brief — we’ll reply soon to set up a call.\n" +
        "Need us sooner? Call or WhatsApp " + CONFIG.STUDIO_PHONE + ".",
    ),
    htmlBody: emailHtml_({
      eyebrow: "Your project brief",
      title: "Thanks, " + first + " — we’ve got it.",
      intro:
        "Here’s a copy of what you sent. We’ll read it and reply soon to set up a call. Need us sooner? Call or WhatsApp " +
        CONFIG.STUDIO_PHONE + ".",
      brief: b,
      actions: [
        { label: "WhatsApp us", href: "https://wa.me/" + CONFIG.STUDIO_WHATSAPP },
        { label: "Visit goeldesigns.com", href: CONFIG.STUDIO_SITE },
      ],
      footer: CONFIG.STUDIO_NAME + " · " + CONFIG.STUDIO_EMAIL + " · " + CONFIG.STUDIO_PHONE,
    }),
  });
}

function briefRows_(b) {
  return [
    ["Name", b.name],
    ["Email", b.email],
    ["Phone / WhatsApp", b.phone],
    ["Company / brand", b.company || "Not given"],
    ["Services", b.services.length ? b.services.join(", ") : "Not given"],
    ["Budget", b.budget || "Not given"],
    ["Timeline", b.timeline || "Not given"],
    ["About the project", b.details || "Not given"],
  ];
}

function plainBrief_(b, intro) {
  return (
    intro +
    "\n\n" +
    briefRows_(b)
      .map((r) => r[0] + ": " + r[1])
      .join("\n") +
    "\n\n— " +
    CONFIG.STUDIO_NAME +
    " · " +
    CONFIG.STUDIO_SITE
  );
}

function emailHtml_(o) {
  const rows = briefRows_(o.brief)
    .map(
      (r) =>
        '<tr><td style="padding:10px 0;border-top:1px solid #e8e7ed;color:#6f6f78;font-size:13px;width:150px;vertical-align:top">' +
        esc_(r[0]) +
        '</td><td style="padding:10px 0;border-top:1px solid #e8e7ed;color:#202124;font-size:14px;white-space:pre-wrap">' +
        esc_(r[1]) +
        "</td></tr>",
    )
    .join("");
  const actions = o.actions
    .map(
      (a, i) =>
        '<a href="' +
        esc_(a.href) +
        '" style="display:inline-block;margin:0 8px 8px 0;padding:10px 14px;border-radius:8px;font-size:14px;font-weight:600;text-decoration:none;' +
        (i === 0 ? "background:" + CONFIG.BRAND + ";color:#ffffff" : "background:#f0eeff;color:#4334b8") +
        '">' +
        esc_(a.label) +
        "</a>",
    )
    .join("");
  return (
    '<div style="background:#f7f7fa;padding:24px 12px;font-family:Inter,Segoe UI,Arial,sans-serif">' +
    '<div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e8e7ed;border-radius:14px;overflow:hidden">' +
    '<div style="padding:20px 24px;border-bottom:1px solid #e8e7ed">' +
    '<span style="display:inline-block;width:28px;height:28px;border-radius:8px;background:' +
    CONFIG.BRAND +
    ';color:#fff;font-weight:700;text-align:center;line-height:28px;vertical-align:middle">G</span>' +
    '<span style="margin-left:10px;font-size:15px;font-weight:600;color:#202124;vertical-align:middle">' +
    esc_(CONFIG.STUDIO_NAME) +
    "</span></div>" +
    '<div style="padding:24px">' +
    '<p style="margin:0;font-size:12px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:' +
    CONFIG.BRAND +
    '">' +
    esc_(o.eyebrow) +
    "</p>" +
    '<h1 style="margin:8px 0 0;font-size:22px;line-height:1.25;color:#202124">' +
    esc_(o.title) +
    "</h1>" +
    '<p style="margin:10px 0 0;font-size:14px;line-height:1.6;color:#6f6f78">' +
    esc_(o.intro) +
    "</p>" +
    '<table role="presentation" style="width:100%;border-collapse:collapse;margin-top:18px">' +
    rows +
    "</table>" +
    '<div style="margin-top:20px">' +
    actions +
    "</div></div>" +
    '<div style="padding:14px 24px;background:#f7f7fa;border-top:1px solid #e8e7ed;font-size:12px;color:#6f6f78">' +
    esc_(o.footer) +
    "</div></div></div>"
  );
}

/* ───────────────────────── Helpers ───────────────────────── */

function clean_(d) {
  const str = (v, max) =>
    String(v == null ? "" : v)
      .replace(/\s+$/g, "")
      .replace(/^\s+/g, "")
      .slice(0, max);
  const services = Array.isArray(d.services) ? d.services.slice(0, 12).map((s) => str(s, 60)).filter(Boolean) : [];
  return {
    name: str(d.name, 120),
    email: str(d.email, 200).toLowerCase(),
    phone: str(d.phone, 40),
    company: str(d.company, 160),
    services: services,
    budget: str(d.budget, 40),
    timeline: str(d.timeline, 40),
    details: str(d.details, 5000),
    page: str(d.page, 300),
  };
}

function validate_(b) {
  if (!b.name) return "Enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email)) return "Enter a valid email address.";
  const digits = b.phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 15) return "Enter a phone number with at least 10 digits.";
  return "";
}

// Stop client text being read as a formula when it lands in the sheet
function safeCell_(v) {
  return typeof v === "string" && /^[=+\-@\t\r]/.test(v) ? "'" + v : v;
}

function waDigits_(phone) {
  const digits = String(phone).replace(/\D/g, "");
  return digits.length === 10 ? "91" + digits : digits;
}

function firstName_(name) {
  return String(name).trim().split(/\s+/)[0] || "there";
}

function esc_(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
