import React from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import allLocales from "@fullcalendar/core/locales-all";

//Hyvä demo : https://codesandbox.io/s/github/fullcalendar/fullcalendar-example-projects/tree/master/react?file=/src/DemoApp.jsx
//Dokumentaatio: https://fullcalendar.io/docs
const Calendar = () => {
  let eventGuid = 0;

  const createEventId = () => {
    return String(eventGuid++);
  };

  const [events, setEvents] = React.useState([
    {
      id: createEventId(),
      title: "Testitapahtuma",
      start: "2021-04-12T10:00",
      end: "2021-04-12T12:00",
    },
  ]);

  const handleDateSelect = (selectInfo) => {
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  const handleEventButton = (selectInfo) => {
    console.log("HandleEventButton clicked");
    let title = prompt("Please enter a title for your event");
    let startDate = prompt(
      "Please enter event start date (in format YYYY-MM-DDTXX:XX)"
    );
    let endDate = prompt(
      "Please enter event end date (in format YYYY-MM-DDTXX:XX)"
    );
    let calendarApi = selectInfo.view.calendar;

    console.log(startDate, endDate);

    if (title && startDate && endDate && endDate > startDate) {
      alert("Promptit täytetty oikein");
      let newEvent = {
        id: createEventId(),
        title,
        start: startDate,
        end: endDate,
      };
      calendarApi.addEvent(newEvent);
      setEvents((events) => [...events, newEvent]);
    } else {
      alert("Promptit täytetty väärin");
    }
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="timeGridWeek"
      initialEvents={events}
      height="100%"
      locale="fi"
      selectable
      slotMinTime="08:00:00"
      slotMaxTime="22:00:00"
      nowIndicator
      allDaySlot={false}
      firstDay="1"
      select={handleDateSelect}
      /* HeaderToolbar toimii hauskasti, jos elementtien välissä on space, tulee kalenteriin tyhjä väli, jos pilkku ne yhdistyvät
        Kokeile esim left:'prev,next today'
        */
      headerToolbar={{
        left: "prev next today",
        center: "title myCustomButton",
        right: "timeGridWeek timeGridDay",
      }}
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
