import React from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import './GuruCalendar.css';



const GuruCalendar = () => {

    const [events, setEvents] = React.useState([
        {
            id: "yeah",
            title: "Guru ei ole täällä tänään",
            start: "2021-04-18T10:00",
            end: "2021-04-18T12:00",
        },
    ]);

    const handleDateSelect = (selectInfo) => {

            let newEvent = {
                id: "kolme",
                title:"jeah",
                start: selectInfo.startStr,
                end: selectInfo.endStr,
            }

            //add to calendar, then add to useState
                setEvents([...events, newEvent])
        console.log(events)

        }





return (

    <div className="calendar">
    <FullCalendar  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin] }
                   width="100%"
                   height="400px"
                   initialView="timeGridWeek"
                   locale="fi"
                   events={events}
                   selectable
                   slotMinTime="08:00:00"
                   slotMaxTime="22:00:00"
                   allDaySlot={false}
                   nowIndicator
                   select={handleDateSelect}
                   headerToolbar={{left: 'title', center:'', right: 'prev,next' }}
                   titleFormat={{year: 'numeric', month:'2-digit', day: '2-digit'}}


    />
    </div>
)



};
export default GuruCalendar;
