import React from "react";
import FullCalendar, { ElementScrollController } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  Button,
  makeStyles,
  Paper,
  Grid,
  TextField,
  Typography,
  Input,
} from "@material-ui/core";
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

const Calendar = (props) => {
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

  //UseState for the previous event managed with Calendar
  //this is so we can delete previously created event if it's date or such is changed.
  const [prevEvent, setPrevEvent] = React.useState({
    id: null,
    title: null,
    start: null,
    end: null,
  });

  //states to help build new party events
  const [pickedDate, setPickedDate] = React.useState(null);
  const [startTime, setStartTime] = React.useState(null);
  const [title, setTitle] = React.useState(null);
  const [endTime, setEndTime] = React.useState(null);

  //to Handle pushing the add event button at the bottom of the calendar
  //currently builds start and end times for the event in the form of yyyy-mm-ddThh:mm
  const handleEventAddButton = (event) => {
    event.preventDefault();
    let start = pickedDate + "T" + startTime;
    let end = pickedDate + "T" + endTime;
    console.log(start, end, title);
    if (start < end && start != null && end != null && title != null) {
      let newEvent = {
        id: createEventId(),
        title,
        start: start,
        end: end,
      };
      let tempEvents = events;
      for (var i = 0; i < tempEvents.length; i++) {
        if (tempEvents[i].id === prevEvent.id) {
          console.log("Hääjetää elementti", tempEvents[i]);
          tempEvents.splice(i, 1);
          setEvents(tempEvents);
          break;
        }
      }
      setPrevEvent(newEvent);
      setEvents((events) => [...events, newEvent]);
      let weekendCheck = new Date(newEvent.start);
      checkIsWeekend(weekendCheck);
      props.setNewPartyReservation(newEvent);
    } else {
      alert(
        "All required fields are not filled or they are filled incorrectly!"
      );
    }
  };

  //Handle changing the date of the party by changing value of pickedState to match
  const handleDateChange = () => {
    const picked = document.getElementById("partyDate").value;
    setPickedDate(picked);
  };

  //Handle changing the party starting time field by changing value of startTime state
  const handleStartChange = () => {
    const picked = document.getElementById("partyStart").value;
    setStartTime(picked);
  };

  //Handle changing the title field of the party by changing value of title state
  const handleTitleChange = () => {
    const title = document.getElementById("eventTitle").value;
    setTitle(title);
  };

  //Handle changing the ending time field of the party by changing value of endTime state
  const handleEndChange = () => {
    const picked = document.getElementById("partyEnd").value;
    setEndTime(picked);
  };

  //Check if date of party is on weekend (Saturday or Sunday)
  //If on weekend, set isWeekend to true in PartyPackage.js, if not, set to false
  //isWeekend is used to calculate the total cost of the party in CostCalculator
  const checkIsWeekend = (partyDate) => {
    let partyDay = partyDate.getDay();
    console.log("Checking", partyDay);
    if (partyDay === 6 || partyDay === 0) {
      console.log(partyDay, "is weekend");
      props.setIsWeekend(true);
    } else {
      console.log(partyDay, "is not weekend");
      props.setIsWeekend(false);
      return;
    }
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
      <form
        id="partyForm"
        name="partyForm"
        style={{ width: "100%", marginTop: "2%" }}
      >
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
              inputProps={{ style: { fontSize: 16 } }}
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
              inputProps={{ style: { fontSize: 16 } }}
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
              inputProps={{ style: { fontSize: 16 } }}
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
              inputProps={{ style: { fontSize: 16 } }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleEventAddButton}
              className={classes.bigButton}
            >
              Add event + spam console for debug
            </Button>
          </Grid>
          <Grid item>
            <label htmlFor="startSelector">Select party start: </label>
            <select name="startSelector" id="startSelector">
              <option value="8:00">8:00</option>
              <option value="8:30">8:30</option>
              <option value="9:00">9:00</option>
              <option value="9:30">9:30</option>
              <option value="10:00">10:00</option>
              <option value="10:30">10:30</option>
              <option value="11:00">11:00</option>
              <option value="11:30">11:30</option>
              <option value="12:00">12:00</option>
              <option value="12:30">12:30</option>
              <option value="13:00">13:00</option>
              <option value="13:30">13:30</option>
              <option value="14:00">14:00</option>
              <option value="14:30">14:30</option>
              <option value="15:00">15:00</option>
              <option value="15:30">15:30</option>
              <option value="16:00">16:00</option>
              <option value="16:30">16:30</option>
              <option value="17:00">17:00</option>
              <option value="17:30">17:30</option>
              <option value="18:00">18:00</option>
              <option value="18:30">18:30</option>
              <option value="19:00">19:00</option>
              <option value="19:30">19:30</option>
              <option value="20:00">20:00</option>
              <option value="20:30">20:30</option>
              <option value="21:00">21:00</option>
              <option value="21:30">21:30</option>
              <option value="22:00">22:00</option>
            </select>
          </Grid>
          <Grid item>
            <label htmlFor="duration">Select party duration: </label>
            <select name="duration" id="duration">
              <option value="1:00">1:00</option>
              <option value="2:00">2:00</option>
              <option value="3:00">3:00</option>
              <option value="8:00">8:00</option>
            </select>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};
export default Calendar;
