import React, {useState, useEffect} from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import './GuruCalendar.css';
import axios from "axios";
import GuruLargeCalendar from "./GuruCalendarComponents/GuruLargeCalendar";
import {Dialog} from "@material-ui/core";
import GuruCalendarEventAdder from "./GuruCalendarComponents/GuruCalendarEventAdder";



const GuruSmallCalendar = (props) => {

    const [events, setEvents] = useState([{}])
    const [largeCalendarOpen, setLargeCalendarOpen] = useState(false)
    const [eventAdderOpen, setEventAdderOpen] =useState(false)
    const [eventStart, setEventStart] = useState(new Date())
    const [eventEnd, setEventEnd] = useState(new Date())



    useEffect(() => {
        setEvents(props.UnavailableDates)
    }, [props.UnavailableDates]);

    const handleDateSelect = (selectInfo) => {

        setEventStart(selectInfo.startStr)
        setEventEnd(selectInfo.endStr)
        setEventAdderOpen(true)
       /* if (window.confirm("Are you unavailable from " + selectInfo.startStr + ' to ' + selectInfo.endStr + '?'))
            setEvents([...events, newEvent])
            console.log(events) */
    }

    const saveNewEvent = () => {
        let newEvent = {
            title: "Unavailable",
            start: eventStart,
            end: eventEnd
        }
        setEvents([...events, newEvent])
        setEventAdderOpen(false)
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

    const handleCalendarClose = () => {
        setLargeCalendarOpen(false)
    }

    const handleEventAdderClose = () => {
        setEventAdderOpen(false)
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

        <GuruLargeCalendar  handleDateSelect={handleDateSelect} submitData={submitData} events={events} handleClose={handleCalendarClose} open={largeCalendarOpen}/>
        <GuruCalendarEventAdder open={eventAdderOpen} onClose={handleEventAdderClose} addEvent={saveNewEvent} eventStart={eventStart} eventEnd={eventEnd}/>
        </div>
)



};
export default GuruSmallCalendar;
