import { auth } from "./auth.js";
import { google } from "googleapis";

export async function getSheetEvents() {
    const sheets = google.sheets({ version: "v4", auth });
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Events!A2:L999", 
    });
    
    const rows = response.data.values; 
    if (!rows || rows.length === 0) {
      console.log('No data found.');
      return;
    }

    const events = [];
    rows.forEach((row) => {
      const event = {
        id: row[0],
        title: row[1],
        startDate: row[2],
        endDate: row[3],
        location: row[4],
        description: row[5],
        price: row[6],
        capacity: row[7],
        attendees: row[8],
        color: row[9],
        status: row[10],
        imageUrl: row[11]
      }
      events.push(event);
    });
    
    return events;
}

export async function getCalendarEvents() {
  const calendar = google.calendar({version: 'v3', auth});
  
  const response = await calendar.events.list({
    calendarId: process.env.GOOGLE_CALENDAR_ID,
    timeMin: new Date().toISOString(),
    //maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  });
  
  const events = response.data.items;
  console.log(events);
  if (!events || events.length === 0) {
    console.log('No upcoming events found.');
    return;
  }
  return response;
}

/*export async function saveToSheet(data) {
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
    range: "Sheet1!A2",
    valueInputOption: "RAW",
    requestBody: { values },
  });
}*/

