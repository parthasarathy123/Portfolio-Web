# Contact Form Setup

The portfolio form sends messages through the site server to a Google Apps Script web app. The script writes each message to a Google Sheet and emails you a notification. The two values below stay in Vercel environment variables; do not add them to the repository.

1. Create a Google Sheet named `Portfolio contact leads`.
2. In that Sheet, choose **Extensions > Apps Script** and replace the starter code with [Code.gs](google-apps-script/Code.gs).
3. In Apps Script, open **Project Settings > Script Properties** and add:
   - `CONTACT_FORM_SECRET`: a long, random value you create.
   - `NOTIFICATION_EMAIL`: the inbox that should receive contact notifications.
4. Choose **Deploy > New deployment > Web app**. Set **Execute as** to yourself and **Who has access** to anyone. Copy the web app URL.
5. In Vercel, open the project’s **Settings > Environment Variables** and add:
   - `CONTACT_GOOGLE_APPS_SCRIPT_URL`: the web app URL.
   - `CONTACT_WEBHOOK_SECRET`: the same value used for `CONTACT_FORM_SECRET`.
6. Redeploy the project, then send a test message from the contact form. It should create a Sheet row and send an email notification.

For local testing, create a `.env.local` file with those same two variable names. Keep it private; it is ignored by Git.
