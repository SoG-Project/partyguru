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

  const createEventId = () => {
    return String(eventGuid++);
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="timeGridWeek"
      initialDate="2021-04-08"
      height="100%"
      locale="fi"
      selectable
      slotMinTime="08:00:00"
      slotMaxTime="22:00:00"
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
        myCustomButton:{
          text:'custom button',
          click: function() {
            alert('Custom button clicked!')
          }
        }
      }}
    />
  );
};
export default Calendar;
