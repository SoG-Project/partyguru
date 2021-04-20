import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Button, makeStyles, Paper, Grid, TextField, Typography, Input } from "@material-ui/core";
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

  //useState to contain all events, this should be sent to backend and recovered from there somehow
  const [events, setEvents] = React.useState([
    {
      id: createEventId(),
      title: "Testitapahtuma",
      start: "2021-04-23T10:00",
      end: "2021-04-23T12:00",
    },
  ]);

  const [pickedDate, setPickedDate] = React.useState(null);
  const [startTime, setStartTime] = React.useState(null);
  const [title, setTitle] = React.useState(null);
  const [endTime, setEndTime] = React.useState(null);

  const handleEventAddButton = (event) => {
    event.preventDefault();
    let start = pickedDate + "T" + startTime;
    let end = pickedDate + "T" + endTime;
    console.log(start, end, title);
    if (start < end) {
      console.log("start pienempi kuin end");
      let newEvent = {
        id: createEventId(),
        title,
        start: start,
        end: end,
      };
      setEvents((events) => [...events, newEvent]);
    }
  };

  const handleDateChange = () => {
    const picked = document.getElementById("partyDate").value;
    setPickedDate(picked);
  };

  const handleStartChange = () => {
    const picked = document.getElementById("partyStart").value;
    setStartTime(picked);
  };

  const handleTitleChange = () => {
    const title = document.getElementById("eventTitle").value;
    setTitle(title);
  };
  const handleEndChange = () => {
    const picked = document.getElementById("partyEnd").value;
    setEndTime(picked);
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
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        //initialView: what view is open by default
        initialView="timeGridWeek"
        //events taken from useState
        events={events}
        locale="fi"
        //Can the calendar be painted to create events, default true, change with selectable={false}
        selectable={false}
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
      <form style={{ width: "100%", marginTop:"2%" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h3">Create party reservation</Typography>
          </Grid>
          <Grid item xs={6}>
            <label htmlFor="eventTitle">Enter event title: </label>
            <Input
              required
              type="text"
              id="eventTitle"
              name="eventTitle"
              placeholder="Enter title here..."
              onChange={handleTitleChange}
              inputProps={{style:{fontSize:16}}}
            />
          </Grid>
          <Grid item xs={6}>
            <label>Select party date: </label>
            <Input
              required
              type="date"
              id="partyDate"
              name="partyDate"
              onChange={handleDateChange}
              inputProps={{style:{fontSize:16}}}
            />
          </Grid>
          <Grid item xs={6}>
            <label htmlFor="partyStart">Select party start time: </label>
            <Input
              required
              type="time"
              min="08:00"
              max="22:00"
              id="partyStart"
              name="partyStart"
              onChange={handleStartChange}
              inputProps={{style:{fontSize:16}}}
            />
          </Grid>
          <Grid item xs={6}>
            <label htmlFor="partyEnd">Select party ending time: </label>
            <Input
              required
              type="time"
              min="08:00"
              max="22:00"
              id="partyEnd"
              name="partyEnd"
              onChange={handleEndChange}
              inputProps={{style:{fontSize:16}}}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleEventAddButton}
              className={classes.bigButton}
            >
              Add event + print selections to console
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};
export default Calendar;

//Material UI form, tarkista submittien arvot mui buttonilla?