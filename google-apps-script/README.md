# Connect the website's "Send" button to Google Sheets + email

When a client presses **Send** on the website, their brief is:

1. added as a new row in a Google Sheet (tab **Briefs**, with a **Status** dropdown: New → Contacted → Quoted → Won / Lost),
2. emailed to **info@goeldesigns.com** (hit Reply to answer the client directly),
3. emailed back to the client as a copy.

It runs on Google Apps Script, so there is no server to host and it's free. Setup takes about 5 minutes and is done once.

---

## 1. Create the sheet

Sign in to the Google account that should **send** the emails, ideally the one behind info@goeldesigns.com. Then open **https://sheets.new** and name the sheet, for example *Goel Designs — Website briefs*.

> Emails are sent from this Google account. If it's a personal Gmail, emails show "Goel Designs" as the sender name and replies still go to info@goeldesigns.com.

## 2. Add the script

1. In the sheet, open **Extensions → Apps Script**.
2. Delete the sample code, paste in everything from [`Code.gs`](Code.gs), and press **Save** (💾). Name the project *Goel Designs briefs*.

## 3. Run setup once (gives permission)

1. In the toolbar's function dropdown, choose **`setup`**, then press **Run**.
2. Google asks for permission: **Review permissions** → pick your account → **Advanced** → **Go to Goel Designs briefs (unsafe)** → **Allow**.
   *It says "unsafe" only because it's your own private script that Google hasn't reviewed. It can only edit this one sheet and send email.*
3. Back in the sheet, a formatted **Briefs** tab now exists.

Optional: run **`sendTestBrief`** the same way. It adds a sample row and sends both emails to info@goeldesigns.com so you can see them.

## 4. Deploy it as a web app

1. **Deploy → New deployment** → click the gear ⚙ → **Web app**.
2. Description: *Website briefs* · **Execute as: Me** · **Who has access: Anyone**.
3. **Deploy**, then copy the **Web app URL**. It ends in `/exec`.

> "Anyone" only lets the website *submit* briefs. Nobody can read your sheet through this URL.

## 5. Put the URL in the website

**Running locally:** open `.env.local` in the project folder and paste the URL:

```
NEXT_PUBLIC_BRIEF_ENDPOINT=https://script.google.com/macros/s/AKfy.../exec
```

Then restart `npm run dev`.

**On Vercel:** Project → **Settings → Environment Variables** → add `NEXT_PUBLIC_BRIEF_ENDPOINT` with the URL → **Redeploy**.

**Other hosts:** set the same variable before running `npm run build`, then upload `out/`.

Done. Send a test brief from the website and it appears in the sheet within a few seconds.

---

## Good to know

- **Changing the script later:** after editing `Code.gs`, go to **Deploy → Manage deployments → ✏️ Edit → Version: New version → Deploy**. The URL stays the same. If you skip this, the website keeps using the old version.
- **Settings** are at the top of `Code.gs` (`CONFIG`):
  - `NOTIFY_TO`: who gets new briefs (comma-separate for several).
  - `SEND_CLIENT_COPY`: set to `false` to stop emailing clients a copy.
- **Email limits:** a free Gmail account can send about 100 emails a day, and Google Workspace about 1,500. Each brief uses 2 (yours plus the client copy).
- **Spam protection:** a hidden trap field plus a minimum time to fill the form. Client text is cleaned so it can't run formulas in your sheet.
- **If the script is ever unreachable**, the website tells the client it didn't send and offers WhatsApp. Nothing they typed is lost.
