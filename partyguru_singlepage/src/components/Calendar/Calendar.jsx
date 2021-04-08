import React from 'react';
import FullCalendar, {formatDate} from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import allLocales from '@fullcalendar/core/locales-all';



//Hyvä demo : https://codesandbox.io/s/github/fullcalendar/fullcalendar-example-projects/tree/master/react?file=/src/DemoApp.jsx
//Dokumentaatio: https://fullcalendar.io/docs
const Calendar = () => {
    
let eventGuid = 0

    const handleDateSelect = (selectInfo) => {
        let title = prompt('Please enter a new title for your event')
        let time = prompt('Enter time for party')
        let calendarApi = selectInfo.view.calendar
    
        calendarApi.unselect() // clear date selection
    
        if (title && time) {
          calendarApi.addEvent({
            id: createEventId(),
            title,
            start: selectInfo.startStr,
            end: selectInfo.endStr,
            allDay: selectInfo.allDay
          })
        }
      }

      const createEventId = () => {
        return String(eventGuid++)
      }
      


    return(
        <FullCalendar
        plugins = {[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
        initialView="timeGridWeek"
        initialDate='2021-04-08'
        height="100%"
        locale="fi"
        selectable
        select={handleDateSelect}
        /* HeaderToolbar toimii hauskasti, jos elementtien välissä on space, tulee kalenteriin tyhjä väli, jos pilkku ne yhdistyvät
        Kokeile esim left:'prev,next today'
        */
        headerToolbar={{
            
            left:'prev next today',
            center:'title',
            right:'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        />
    );
}
export default Calendar;