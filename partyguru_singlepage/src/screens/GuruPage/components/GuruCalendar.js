import React from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";


const GuruCalendar = () => {

return (

    <div className="calendar">
    <FullCalendar  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin] }
                   width="100%"
                   height="400px"
                   initialView="timeGridWeek"
                   locale="fi"
                   slotMinTime="08:00:00"
                   slotMaxTime="22:00:00"
                   allDaySlot={false}

                   headerToolbar={{left: 'title', center:'', right: 'prev,next' }}
                   titleFormat={{year: 'numeric', month:'2-digit', day: '2-digit'}}


    />
    </div>
)



};
export default GuruCalendar;
