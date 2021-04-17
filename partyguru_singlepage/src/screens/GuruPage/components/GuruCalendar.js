import React from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import './GuruCalendar.css';
import axios from "axios";



const GuruCalendar = (props) => {

    const [events, setEvents] = React.useState([
        {

        },
    ]);

    const handleDateSelect = (selectInfo) => {

        let newEvent = {
            title: "Unavailable",
            start: selectInfo.startStr,
            end: selectInfo.endStr,
        }

        //add to calendar, then add to useState
        if (window.confirm("Are you unavailable from " + selectInfo.startStr + ' to ' + selectInfo.endStr + '?'))
            setEvents([...events, newEvent])
            console.log(events)
    }

    const handleSubmit = () => {

        console.log(props.guruID)
        axios.put(`/api/gurus/${props.guruID}`, {timeswhenunavailable: ["huomenna"]} ).then(response => {
            console.log(response.data)
        })
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
                   headerToolbar={{left: 'title', center:'submitButton', right: 'prev,next' }}
                   titleFormat={{year: 'numeric', month:'2-digit', day: '2-digit'}}

                   customButtons={{
                       submitButton: {
                           text: "Submit",
                           click: handleSubmit,
                       },
                   }}


    />
    </div>
)



};
export default GuruCalendar;
