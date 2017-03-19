const calendarId = 'sample@group.calendar.google.com'; // replace to your calendar id

class PostEvent {
  queryString: string;
  parameter: { [index: string]: string; };
  parameters: { [index: string]: [string]; };
  contentLenth: number;
  postData: {
    length: number;
    type: string;
    contents: string;
    name: string;
  };
}

function _test() {
  let e = new PostEvent;
  e.postData = {
    length: 0,
    type: "",
    contents: '{"title":"sample title", "startTime": "2017-03-19T09:00:00.000Z", "endTime": "2017-03-19T12:00:00.000Z"}',
    name: ""
  };
  doPost(e);
}

class CalendarEvent{
  title: string;
  startTime: Date;
  endTime: Date;
}

function doPost(e: PostEvent):GoogleAppsScript.Content.TextOutput {
  let calendarEvent = new CalendarEvent;
  let contents = JSON.parse(e.postData.contents)
  calendarEvent.title = contents.title
  calendarEvent.startTime = new Date(contents.startTime)
  calendarEvent.endTime = new Date(contents.endTime)
  let result = JSON.stringify(calendarEvent);
  return ContentService.createTextOutput(result);
}

function createEvent(e: CalendarEvent) {
  CalendarApp.getCalendarById(calendarId).createEvent(
    e.title,
    e.startTime,
    e.endTime,
  )
}
