import { auth } from "./auth.js";
import { google } from "googleapis";

export async function saveToGoogleSheet(data) {
  const sheets = google.sheets({ version: "v4", auth });

  const values = data.map((item) => [
    item.firstName,
    item.lastName,
    item.email,
    item.phone,
    item.plan,
    item.premium_amount,
    item.start_policy_date,
    item.end_policy_date,
  ]);

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: "Sheet1!A2", // Adjust based on your sheet structure
    valueInputOption: "RAW",
    requestBody: { values },
  });

  console.log("Data saved successfully!");
}

export async function listCalendarEvents() {
  const calendar = google.calendar({version: 'v3', auth});
  
  const result = await calendar.events.list({
    calendarId: process.env.GOOGLE_CALENDAR_ID,
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  });
  
  const events = result.data.items;
  console.log(events);
  if (!events || events.length === 0) {
    console.log('No upcoming events found.');
    return;
  }
  console.log('Upcoming 10 events:');

  for (const event of events) {
    const start = event.start?.dateTime ?? event.start?.date;
    console.log(`${start} - ${event.summary}`);
  }
}

