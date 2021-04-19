import React, {useState, useEffect} from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import './GuruCalendar.css';
import axios from "axios";
import {Dialog} from "@material-ui/core";



const GuruLargeCalendar = (props) => {

    const [events, setEvents] = useState([{
    },
    ]);


    const handleSubmit = () => {


    }

    return (

        
        <Dialog maxWidth='md' fullWidth={true} open={props.open} onClose={props.handleClose}>
        <div className="calendar">
            <FullCalendar  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin] }
                           width="100%"
                           height="400px"
                           initialView="timeGridWeek"
                           locale="fi"
                           events={props.events}
                           eventOverlap={false}
                           selectable
                           slotMinTime="08:00:00"
                           slotMaxTime="22:00:00"
                           allDaySlot={false}
                           select={props.handleDateSelect}
                           nowIndicator
                           headerToolbar={{left: 'title', center:'prev,next', right: 'submitButton' }}
                           titleFormat={{year: 'numeric', month:'2-digit', day: '2-digit'}}

                           customButtons={{
                               submitButton: {
                                   text: "Submit",
                                   click: props.submitData,
                               },
                           }}


            />
        </div>
        </Dialog>
    )



};
export default GuruLargeCalendar;
