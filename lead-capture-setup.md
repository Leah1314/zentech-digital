# ZenTech Lead Capture Setup

The website form is ready for a real lead database, but static HTML cannot write directly to a private Google Sheet by itself. The Google Sheet database has been created here:

https://docs.google.com/spreadsheets/d/1iWgK8nm2JSOgSI3EHjzgqiA-JiCGWnM2b0B-sU9Nfhs/edit

## Current Behavior

Until a live endpoint is connected, form submissions are stored in the visitor's browser local storage and can be exported with the `Download local test leads` button.

This is useful for testing, but it is not a production database.

## Production Setup

1. Open the Google Sheet above.
2. Go to `Extensions` -> `Apps Script`.
3. Paste the code from `google-apps-script-lead-capture.js`.
4. Deploy as a web app:
   - Execute as: `Me`
   - Who has access: `Anyone`
5. Copy the web app URL.
6. In `script.js`, replace:

```js
const LEAD_CAPTURE_ENDPOINT = "";
```

with:

```js
const LEAD_CAPTURE_ENDPOINT = "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL";
```

After that, submissions will append to the `Leads` tab in the Google Sheet.

## Sheet Columns

- Created At
- Name
- Email
- Organization
- Interest Area
- Free Trial Interest
- Message
- Source Page
- Status
- Notes
- Website / LinkedIn
- Consent

## Recommended Workflow

Use the `Status` column to manage follow-up:

- `New`
- `Contacted`
- `Invited`
- `Active Trial`
- `Not Fit`
- `Partner Lead`
