import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Button, makeStyles, Paper, Grid } from "@material-ui/core";
//Hyvä demo : https://codesandbox.io/s/github/fullcalendar/fullcalendar-example-projects/tree/master/react?file=/src/DemoApp.jsx
//Dokumentaatio: https://fullcalendar.io/docs

const useStyles = makeStyles((theme) => ({
  bigButton: {
    margin: "10px",
    minWidth: "80px",
    minHeight: "40px",
    fontSize: "1.2rem",
  },
}));

const Calendar = () => {
  const classes = useStyles();
  //eventGuid is used to create IDs for events
  let eventGuid = 0;

  //Used to create a new ID for the next event
  const createEventId = () => {
    return String(eventGuid++);
  };

  const getSelectedDate = () => {
    const picked = document.getElementById("partyDate").value;
    console.log(picked);
  };

  //useState to contain all events, this should be sent to backend and recovered from there somehow
  const [events, setEvents] = React.useState([
    {
      id: createEventId(),
      title: "Testitapahtuma",
      start: "2021-04-23T10:00",
      end: "2021-04-24T12:00",
    },
  ]);

  const [pickedDate, setPickedDate] = React.useState(null);
  const [pickedTime, setPickedTime] = React.useState(null);

  const printUseState = () => {
    console.log(pickedDate, pickedTime);
  };

  const handleDateChange = () => {
    const picked = document.getElementById("partyDate").value;
    setPickedDate(picked);
  };

  const handleTimeChange = () => {
    const picked = document.getElementById("partyTime").value;
    setPickedTime(picked);
  };

  //This is called when you paint squares in the calendar and it creates an event
  //Not necessary, calendar will probably not be "clickable" and will instead be filled through text fields etc
  const handleDateSelect = (selectInfo) => {
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;
    let newEvent = {
      id: createEventId(),
      title,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
    };
    calendarApi.unselect(); // clear date selection

    //add to calendar, then add to useState
    if (title) {
      calendarApi.addEvent(newEvent);
      setEvents((events) => [...events, newEvent]);
    }
  };

  return (
    <Paper
      elevation={5}
      style={{
        width: "90%",
        padding: "1rem",
      }}
    >
      <Grid container direction="column">
        <Grid item>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            //initialView: what view is open by default
            initialView="timeGridWeek"
            //events taken from useState
            events={events}
            locale="fi"
            //Can the calendar be painted to create events, default true, change with selectable={false}
            selectable
            //Time when calendar starts and ends
            slotMinTime="08:00:00"
            slotMaxTime="22:00:00"
            //Change format title date is displayed in
            titleFormat={{ year: "numeric", month: "2-digit", day: "2-digit" }}
            //Red pointer that indicates what time it is now
            nowIndicator
            //Extra top bar that has slots for allDay events
            allDaySlot={false}
            //Change first day to monday
            firstDay="1"
            //What happens when the calender is "selected", aka a section is painted to create an event
            select={handleDateSelect}
            /* HeaderToolbar toimii hauskasti, jos elementtien välissä on space, tulee kalenteriin tyhjä väli, jos pilkku ne yhdistyvät
        Kokeile esim left:'prev,next today'
        */
            headerToolbar={{
              left: "prev next today",
              center: "title",
              right: "timeGridWeek timeGridDay",
            }}
          />
        </Grid>
        <Grid item style={{marginTop:"2%"}}>
          <label>Select date:</label>
          <input
            type="date"
            id="partyDate"
            name="partyDate"
            onChange={handleDateChange}
          />
        </Grid>
        <Grid item style={{marginTop:"1%"}}>
          <label>Select start time:</label>
          <input
            type="time"
            id="partyTime"
            name="partyTime"
            onChange={handleTimeChange}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={printUseState}
            className={classes.bigButton}
          >
            Print selections to console
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default Calendar;
