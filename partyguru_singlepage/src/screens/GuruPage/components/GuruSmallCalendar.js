import React, {useState, useEffect} from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import './GuruCalendar.css';
import axios from "axios";
import GuruLargeCalendar from "./GuruCalendarComponents/GuruLargeCalendar";
import GuruCalendarEventAdder from "./GuruCalendarComponents/GuruCalendarEventAdder.js";
import GuruCalendarEventDeleter from "./GuruCalendarComponents/GuruCalendarEventDeleter";



const GuruSmallCalendar = (props) => {

    const [events, setEvents] = useState([{}])
    const [largeCalendarOpen, setLargeCalendarOpen] = useState(false)
    const [eventAdderOpen, setEventAdderOpen] = useState(false)
    const [eventDeleterOpen, setEventDeleterOpen] = useState(false)
    const [currentEvent, setCurrentEvent] = useState({start:(new Date), end:(new Date), id:''})



    // This hook gets the saved unavailability periods of the user & their upcoming events from the database and renders them into the calendar
    useEffect(() => {

        let newEvents = props.UnavailableDates

        axios.get('/api/parties').then(response => {
            response.data.forEach(party =>{
                if (party.guruid === props.guruID) {
                    let newEvent = {
                        id: party._id,
                        title: party.description,
                        start: party.datetime,
                        end: new Date(party.datetime).setHours(new Date(party.datetime).getHours()+party.duration),
                        color: 'orange',
                        party: true
                    }
                    console.log(party.datetime)
                    newEvents && newEvents.push(newEvent)
                }
            })
            setEvents(newEvents)
        })
    }, [props]);

    // Handle selecting a date with no event attached to it.
    const handleDateSelect = (selectInfo) => {

        // Setting the state of currentEvent to reflect the selection
        setCurrentEvent({start:selectInfo.startStr, end:selectInfo.endStr, id:selectInfo.id})
        setEventAdderOpen(true)

    }

    // Handle selecting an existing event
    const handleEventSelect = (event) => {

        setCurrentEvent({start:event.event.startStr, end:event.event.endStr, id: event.event.id})

        // Checking if event is deletable by color, which is used to classify user's own unavailable times from booked party events.
        // A bit spaghetti-y but then again, pasta is delicious.
        if (event.event.backgroundColor !== "orange")
        setEventDeleterOpen(true)
    }

    // Filtering out the currently selected event by ID in order to remove the event from the calendar
    const deleteEvent = (event) => {
        let newEvents = events.filter(calendarEvent =>
            calendarEvent.id !== currentEvent.id )
        setEvents(newEvents)
        setEventDeleterOpen(false)
    }


    const addNewEvent = (title, recurring) => {

        if (recurring===false) {
            let newEvent = {
                id: Math.floor(Math.random() * 10000).toString(),
                title: title,
                start: currentEvent.start,
                end: currentEvent.end,
                color: 'red',
                party: false,
            }
            setEvents([...events, newEvent])

        }

        if (recurring===true) {

            let newEvents = [{}]
            for(let i=1; i<10; i++) {
                let newEvent = {
                    id: Math.floor(Math.random() * 10000).toString(),
                    title: title,
                    start: new Date(currentEvent.start).setDate(new Date(currentEvent.start).getDate() + i*7),
                    end: new Date(currentEvent.end).setDate(new Date(currentEvent.end).getDate() + i*7),
                    color: 'red',
                    party: false,
                }
                newEvents.push(newEvent)

            }
            setEvents(events.concat(newEvents))
        }


        setEventAdderOpen(false)
    }

    

    // Saving the current calendar unavailability setup to the database
     const submitData = () => {

        console.log(props.guruID)
        axios.put(`/api/gurus/${props.guruID}`, {timeswhenunavailable: events.filter(event => event.party === false)} ).then(response => {
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
                   headerToolbar={{left: 'title', center:'prev,next', right: 'openLargeCalendar' }}
                   titleFormat={{year: 'numeric', month:'2-digit', day: '2-digit'}}

                   customButtons={{
                       openLargeCalendar: {
                           text: "Open",
                           click: openLargeCalendar,
                       },
                   }}/>

        <GuruLargeCalendar  handleDateSelect={handleDateSelect} submitData={submitData} events={events} handleEventSelect={handleEventSelect} handleClose={handleCalendarClose} open={largeCalendarOpen}/>
        <GuruCalendarEventAdder  open={eventAdderOpen} onClose={handleEventAdderClose} addEvent={addNewEvent}  eventStart={currentEvent.start} eventEnd={currentEvent.end}/>
        <GuruCalendarEventDeleter  open={eventDeleterOpen} onClose={handleEventAdderClose} deleteEvent={deleteEvent}  eventStart={currentEvent.start} eventEnd={currentEvent.end}/>

        </div>
)



};
export default GuruSmallCalendar;
