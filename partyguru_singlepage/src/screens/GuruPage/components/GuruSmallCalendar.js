import React, {useState, useEffect} from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import './GuruCalendar.css';
import axios from "axios";
import GuruLargeCalendar from "./GuruLargeCalendar";



const GuruSmallCalendar = (props) => {

    const [events, setEvents] = useState([{}])
    const [largeCalendarOpen, setLargeCalendarOpen] = useState(false)

    useEffect(() => {
        setEvents(props.UnavailableDates)
    }, [props.UnavailableDates]);

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

     const submitData = () => {

        console.log(props.guruID)
        axios.put(`/api/gurus/${props.guruID}`, {timeswhenunavailable: events} ).then(response => {
            console.log(response.data)
        })
    }

    const openLargeCalendar = () => {

        setLargeCalendarOpen(!largeCalendarOpen)
        }

    const handleClose = () => {
        setLargeCalendarOpen(false)
    }


    return (

        <div className="calendar">
        <FullCalendar  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin] }
                   width="100%"
                   height="400px"
                   initialView="timeGridWeek"
                   locale="fi"
                   events={events}
                   eventOverlap={false}
                   selectable={true}
                   slotMinTime="08:00:00"
                   slotMaxTime="22:00:00"
                   allDaySlot={false}
                   nowIndicator
                   select={handleDateSelect}
                   headerToolbar={{left: 'title,prev,next', center:'openLargeCalendar', right: '' }}
                   titleFormat={{year: 'numeric', month:'2-digit', day: '2-digit'}}

                   customButtons={{
                       openLargeCalendar: {
                           text: "Open",
                           click: openLargeCalendar,
                       },
                   }}/>

        <GuruLargeCalendar  handleDateSelect={handleDateSelect} submitData={submitData} events={events} handleClose={handleClose} open={largeCalendarOpen}/>
        </div>
)



};
export default GuruSmallCalendar;
