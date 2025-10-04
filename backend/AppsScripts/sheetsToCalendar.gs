/* 
* Google Apps Script to send data from Google Spreadsheets to Google Calendar
*/

const CALENDAR_ID = 'your calendar ID'

function createorUpdateEvents() {

  /*
  * Open the Calendar
  */
  const calendarId = CALENDAR_ID;
  const sheet = SpreadsheetApp.getActiveSheet();

  /*
  * Import events data from the spreadsheet
  */
  const events = sheet.getRange("A2:G999").getValues();

  /*
  * Event details for creating an event
  */

  let event; // Declare event variable outside the loop

  for ( i = 0; i < events.length; i++ ) {
    const shift = events[i];
    const eventID = shift[0];
    const eventsubject = shift[1];
    const startTime = shift[2];
    const endTime = shift[3];
    const location = shift[4];
    const description = shift[5];
    const color = shift[6];

     // Check if all variables are defined
      if (
        eventID !== undefined && 
        eventsubject !== undefined && 
        description !== undefined && 
        color !== undefined && 
        startTime instanceof Date && 
        endTime instanceof Date
        ) {
        const event = {
            id: eventID,
            summary: eventsubject,
            description: `http://localhost:5173/class/${eventID}`,
            location: location,
            'start': {
                'dateTime': startTime.toISOString(),
                'timeZone': 'America/Phoenix'
            },
            'end': {
                'dateTime': endTime.toISOString(),
                'timeZone': 'America/Phoenix'
            },
            colorId: color
        };

        /** 
        * Insert or update event
        **/
       try {
        let createOrUpdate;
        if (event.id) {
          createOrUpdate = Calendar.Events.update(event, calendarId, eventID);
        } else {
          createOrUpdate = Calendar.Events.insert(event, calendarId);
        }
      } catch (e) {
        if (e.message && e.message.indexOf("Not Found") !== -1) {
          createOrUpdate = Calendar.Events.insert(event, calendarId);
        } else {
          console.error("Error:", e);
        }
      }
    }
  }
}

/*function exportCalendarEventsToSheet() {

  const calendarId = CALENDAR_ID;
  const startDate = new Date('2023-01-01');
  const endDate = new Date('2023-12-31');
  const calendar = CalendarApp.getCalendarById(calendarId);
  const sheet = SpreadsheetApp.getActiveSheet();
  const events = calendar.getEvents(startDate, endDate);
  const data = [];


  if (events.length > 0) {
    for (let i = 0; i < events.length; i++) {
      const event = events[i];
      const eventID = event.getId().split('@')[0];
      const eventTitle = event.getTitle();
      const startTime = event.getStartTime();
      const endTime = event.getEndTime();
      const description = event.getDescription();
      const color = event.getColor();

      data.push([eventID, eventTitle, startTime, endTime, description, color]);
    }

    const numRows = data.length;
    const numCols = data[0].length;
    sheet.getRange(2, 1, numRows, numCols).setValues(data);
  } else {
    console.log('No events exist for the specified range');
  }
}*/

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Sync Data with Calendar')
    .addItem('Calendar to Sheet', 'exportCalendarEventsToSheet')
    .addItem('Sheet to Calendar', 'createorUpdateEvents')
    .addSeparator()
    .addSubMenu(
      ui.createMenu('About')
        .addItem('Documentation', 'showDocumentation')
    )
    .addToUi();
}

function showDocumentation() {
  var htmlOutput = HtmlService.createHtmlOutput('<p>For more info, visit <a href="https://github.com/sarahcssiqueira/google-sheets-calendar-synchronizer" target="_blank">this link</a>.');
  var ui = SpreadsheetApp.getUi();
  ui.showModalDialog(htmlOutput, 'Documentation');
}

function closeDialog() {
  google.script.host.close();
}
