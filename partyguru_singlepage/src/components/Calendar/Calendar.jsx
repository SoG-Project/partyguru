import React from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import allLocales from "@fullcalendar/core/locales-all";

//Hyvä demo : https://codesandbox.io/s/github/fullcalendar/fullcalendar-example-projects/tree/master/react?file=/src/DemoApp.jsx
//Dokumentaatio: https://fullcalendar.io/docs
const Calendar = () => {

  //eventGuid is used to create IDs for events
  let eventGuid = 0;

  //Used to create a new ID for the next event
  const createEventId = () => {
    return String(eventGuid++);
  };

  //useState to contain all events, this should be sent to backend and recovered from there somehow
  const [events, setEvents] = React.useState([
    {
      id: createEventId(),
      title: "Testitapahtuma",
      start: "2021-04-12T10:00",
      end: "2021-04-12T12:00",
    },
  ]);

  //This is called when you paint squares in the calendar and it creates an event
  //Not necessary, calendar will probably not be "clickable" and will instead be filled through text fields etc
  const handleDateSelect = (selectInfo) => {
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;
    let newEvent = {
      id: createEventId(),
      title,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
    }
    calendarApi.unselect(); // clear date selection

    //add to calendar, then add to useState
    if (title) {
      calendarApi.addEvent(newEvent);
      setEvents((events) => [...events, newEvent]);
    }
  };

  //Handles clicking the Add event button on the calendar
  //Basically does the same thing as handleDateSelect but with prompts and without touching the calendar directly
  const handleEventButton = () => {
    console.log("HandleEventButton clicked");
    let title = prompt("Please enter a title for your event");
      //Format is awkward, only temp solution
      //Example valid date: '2021-04-12T10:00' -> 10am on 12.04.2021
    let startDate = prompt(
      "Please enter event start date & time (in format YYYY-MM-DDTHH:MM)" 
    );
    let endDate = prompt(
      "Please enter event end date & time (in format YYYY-MM-DDTXX:XX)"
    );

    //If all data entered and endDate is later ("greater") than startDate
    if (title && startDate && endDate && endDate > startDate) {
      alert("Prompts filled correctly");
      let newEvent = {
        id: createEventId(),
        title,
        start: startDate,
        end: endDate,
      };
      //calendarApi.addEvent(newEvent);
      setEvents((events) => [...events, newEvent]);

    } else {
      alert("Prompts filled wrong");
    }
  };
  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      //initialView: what view is open by default
      initialView="timeGridWeek"
      //events taken from useState
      events = {events}
      height="100%"
      locale="fi"
      //Can the calendar be painted to create events, default true, change with selectable={false}
      selectable
      //Time when calendar starts and ends
      slotMinTime="08:00:00"
      slotMaxTime="22:00:00"
      //Change format title date is displayed in
      titleFormat={{year: 'numeric', month:'2-digit', day: '2-digit'}}
      //Red pointer that indicates what time it is now
      nowIndicator
      //Extra top bar that has slots for allDay events
      allDaySlot={false}
      //Change first day to monday
      firstDay="1"
      //What happens when the calender is "selected", aka a section is painted to create an event
      select={handleDateSelect}
      /* HeaderToolbar toimii hauskasti, jos elementtien välissä on space, tulee kalenteriin tyhjä väli, jos pilkku ne yhdistyvät
        Kokeile esim left:'prev,next today'
        */
      headerToolbar={{
        left: "prev next today",
        center: "title myCustomButton",
        right: "timeGridWeek timeGridDay",
      }}
      //For defining custom buttons, pretty simple as you can see
      customButtons={{
        myCustomButton: {
          text: "Add event",
          click: handleEventButton,
        },
      }}
    />
  );
};
export default Calendar;
