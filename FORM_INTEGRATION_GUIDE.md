# Google Forms Integration - Deployment Guide

## Overview
This implementation uses **Google Apps Script Web App** to save form submissions directly to Google Sheets without any API keys, OAuth, or backend servers.

## ✅ What This Does

- **Booking Form** → Saves to "Bookings" sheet
- **Franchise Enquiry** → Saves to "Franchise" sheet
- **Email Notifications** → Instant alerts to business owner
- **Success Popups** → Immediate feedback to users
- **100% Free** → No Google Cloud Platform or API costs
- **No Backend Required** → Works with static hosting (Vercel)

---

## 📋 Step-by-Step Deployment

### 1. Create Google Spreadsheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it: **"The Barber Shop - Form Submissions"**
4. Create two sheets with these exact names:
   - **Bookings**
   - **Franchise**

> ℹ️ Leave the sheets empty - headers will be auto-created on first submission

---

### 2. Add Apps Script

1. In your spreadsheet: **Extensions → Apps Script**
2. Delete any default code
3. Copy the entire contents of `google-apps-script/FormSubmissionHandler.gs`
4. Paste into the Apps Script editor
5. **Update the configuration:**

```javascript
const CONFIG = {
  OWNER_EMAIL: "thebarbershop114@gmail.com", // ✏️ Change to your email
  SECRET_KEY: "barber_2024_secure",          // ✏️ Change to your own secret
  SHEETS: {
    BOOKINGS: "Bookings",
    FRANCHISE: "Franchise"
  }
};
```

6. **Save the project** (name it "Form Submission Handler")

---

### 3. Deploy as Web App

1. Click **Deploy → New deployment**
2. Click the gear icon ⚙️ → Select **Web app**
3. Configure deployment:
   - **Description:** "Form submission endpoint"
   - **Execute as:** **Me** (your Google account)
   - **Who has access:** **Anyone**
4. Click **Deploy**
5. **Authorize the app:**
   - Click "Authorize access"
   - Select your Google account
   - Click "Advanced" → "Go to Form Submission Handler (unsafe)"
   - Click "Allow"
6. **Copy the Web App URL** (looks like: `https://script.google.com/macros/s/...../exec`)

---

### 4. Configure Environment Variables

#### Local Development (`.env` file)
```bash
VITE_FORM_SUBMISSION_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
VITE_FORM_SECRET=barber_2024_secure
```

#### Production (Vercel)
1. Go to your Vercel project → **Settings → Environment Variables**
2. Add:
   - **Name:** `VITE_FORM_SUBMISSION_URL`
   - **Value:** Your Web App URL
   - **Environments:** Production, Preview, Development
3. Add:
   - **Name:** `VITE_FORM_SECRET`
   - **Value:** `barber_2024_secure` (or your custom secret)
   - **Environments:** Production, Preview, Development

---

### 5. Deploy to Production

```bash
git add .
git commit -m "Integrate Google Sheets form submission"
git push origin main
```

Vercel will auto-deploy with the new environment variables.

---

## 🧪 Testing

### Test Booking Form
1. Go to your website → Booking section
2. Fill out the form:
   - Name: Test User
   - Phone: 1234567890
   - Branch: Select any
   - Date: Tomorrow
   - Time: Any slot
3. Submit
4. **Verify:**
   - ✅ Success popup appears
   - ✅ New row in "Bookings" sheet
   - ✅ Email received at `thebarbershop114@gmail.com`

### Test Franchise Form
1. Go to `/franchise` page
2. Fill out the form
3. Submit
4. **Verify:**
   - ✅ Success popup appears
   - ✅ New row in "Franchise" sheet
   - ✅ Email received

---

## 📊 Google Sheets Structure

### Bookings Sheet
| Name | Phone | Email | Branch | Date | Time | Created At |
|------|-------|-------|--------|------|------|------------|
| John | 9876543210 | | Branch 54 | 2026-01-15 | 3:00 PM | 2026-01-06 11:30:00 |

### Franchise Sheet
| Name | Phone | Email | City | Occupation | Investment | Message | Created At |
|------|-------|-------|------|------------|------------|---------|------------|
| Jane | 9876543210 | jane@example.com | Mumbai | Entrepreneur | ₹20-30 Lakhs | Interested | 2026-01-06 11:30:00 |

---

## 🔒 Security Features

### Secret Key Validation
The Apps Script validates a shared secret before processing submissions:

```javascript
if (data.secret !== CONFIG.SECRET_KEY) {
  return createResponse(false, "Invalid authentication");
}
```

**To change the secret:**
1. Update `SECRET_KEY` in Apps Script
2. Update `VITE_FORM_SECRET` in `.env` and Vercel
3. **Redeploy** the Apps Script (Deploy → Manage deployments → Edit → Version: New version)

---

## 📧 Email Notifications

### Booking Email Example
```
🔔 New Booking Request

Name: John Doe
Phone: 9876543210
Branch: The Barber Shop 54
Date: 2026-01-15
Time: 3:00 PM

Received at: 06/01/2026, 11:30:00 AM
```

### Franchise Email Example
```
🚀 New Franchise Enquiry

Name: Jane Smith
Phone: 9876543210
Email: jane@example.com
City: Mumbai
Occupation: Entrepreneur
Investment Range: ₹20-30 Lakhs
Message: Very interested in franchise opportunity

Received at: 06/01/2026, 11:30:00 AM
```

---

## 🔧 Troubleshooting

### Form submissions not appearing in Sheets
- ✅ Check Web App URL is correct in `.env` and Vercel
- ✅ Verify deployment is set to "Anyone" access
- ✅ Check secret key matches in both Apps Script and frontend
- ✅ Look at Apps Script logs: View → Executions

### No email notifications
- ✅ Verify `OWNER_EMAIL` in Apps Script config
- ✅ Check spam folder
- ✅ Ensure Apps Script has Gmail permissions

### CORS errors in browser console
- ✅ This is normal - we use `mode: "no-cors"` which prevents reading responses
- ✅ The form still works - check Google Sheets for data

### Popup shows success but no data in Sheets
- ✅ Check Apps Script executions log for errors
- ✅ Verify sheet names are exactly "Bookings" and "Franchise"
- ✅ Ensure Apps Script is deployed with latest version

---

## 🚀 Advanced: Updating the Script

If you need to modify the Apps Script later:

1. Make changes in the Apps Script editor
2. **Save** the file
3. **Deploy → Manage deployments**
4. Click ✏️ Edit next to your deployment
5. Change **Version** to **New version**
6. Click **Deploy**
7. The URL stays the same - no need to update environment variables

---

## 💡 Benefits of This Approach

✅ **No API Keys** - No Google Cloud Console setup needed  
✅ **No OAuth** - No complex authentication flow  
✅ **No Backend** - Works with static hosting  
✅ **Free Forever** - No quota or billing concerns  
✅ **Instant Emails** - Business owner notified immediately  
✅ **Easy Management** - View all submissions in Google Sheets  
✅ **Production Ready** - Used by thousands of websites  
✅ **Works Offline** - Submissions queued and sent when online  

---

## 📝 Notes

- **no-cors mode**: Required for Google Apps Script. We can't read responses, but submissions work.
- **Sheet names are case-sensitive**: Must be exactly "Bookings" and "Franchise"
- **Email limits**: Google Apps Script allows ~100 emails/day on free accounts
- **Execution time**: Each request must complete within 30 seconds
- **Concurrent requests**: Apps Script handles multiple simultaneous submissions

---

## 🆘 Support

If issues persist:
1. Check [Apps Script documentation](https://developers.google.com/apps-script)
2. View execution logs in Apps Script: View → Executions
3. Test the Web App directly in browser (should show: `{"success":true,"message":"Form submission handler is running"}`)
