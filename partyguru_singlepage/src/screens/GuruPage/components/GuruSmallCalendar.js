import React, {useState, useEffect} from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import './GuruCalendar.css';
import axios from "axios";
import GuruLargeCalendar from "./GuruCalendarComponents/GuruLargeCalendar";
import {Dialog} from "@material-ui/core";
import GuruCalendarEventAdder from "./GuruCalendarComponents/GuruCalendarEventAdder.js";
import GuruCalendarEventDeleter from "./GuruCalendarComponents/GuruCalendarEventDeleter";



const GuruSmallCalendar = (props) => {

    const [events, setEvents] = useState([{}])
    const [largeCalendarOpen, setLargeCalendarOpen] = useState(false)
    const [eventAdderOpen, setEventAdderOpen] = useState(false)
    const [eventDeleterOpen, setEventDeleterOpen] =useState(false)
    const [currentEvent, setCurrentEvent] = useState({start:(new Date), end:(new Date), id:''})
    const [dialogText, setDialogText] = useState('')


    useEffect(() => {
        setEvents(props.UnavailableDates)
    }, [props.UnavailableDates]);

    const handleDateSelect = (selectInfo) => {

        setCurrentEvent({start:selectInfo.startStr, end:selectInfo.endStr, id:selectInfo.id})
        setEventAdderOpen(true)
       /* if (window.confirm("Are you unavailable from " + selectInfo.startStr + ' to ' + selectInfo.endStr + '?'))
            setEvents([...events, newEvent])
            console.log(events) */
    }

    const handleEventSelect = (event) => {
        setCurrentEvent({start:event.event.startStr, end:event.event.endStr, id: event.event.id})
        setEventDeleterOpen(true)
    }

    const deleteEvent = (event) => {
        let newEvents = events.filter(calendarEvent =>
            calendarEvent.id !== currentEvent.id )
        setEvents(newEvents)
        setEventDeleterOpen(false)
    }


    const saveNewEvent = () => {

        let newEvent = {
            id: Math.floor(Math.random() * 1000).toString(),
            title: "Unavailable",
            start: currentEvent.start,
            end: currentEvent.end
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
        setEventDeleterOpen(false)
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
                   selectable={false}
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

        <GuruLargeCalendar  handleDateSelect={handleDateSelect} submitData={submitData} events={events} handleEventSelect={handleEventSelect} handleClose={handleCalendarClose} open={largeCalendarOpen}/>
        <GuruCalendarEventAdder text={dialogText} open={eventAdderOpen} onClose={handleEventAdderClose} addEvent={saveNewEvent}  eventStart={currentEvent.start} eventEnd={currentEvent.end}/>
        <GuruCalendarEventDeleter  open={eventDeleterOpen} onClose={handleEventAdderClose} deleteEvent={deleteEvent}  eventStart={currentEvent.start} eventEnd={currentEvent.end}/>



        </div>
)



};
export default GuruSmallCalendar;
