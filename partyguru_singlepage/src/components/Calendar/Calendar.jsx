import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  Button,
  makeStyles,
  Paper,
  Grid,
  Typography,
  Input,
  NativeSelect,
} from "@material-ui/core";
//FullCalendar documentation: https://fullcalendar.io/docs

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
      start: "2021-04-29T10:00",
      end: "2021-04-29T12:00",
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
  const [startTime, setStartTime] = React.useState("08:00");
  const [title, setTitle] = React.useState(null);
  const [duration, setDuration] = React.useState(1);

  //to Handle pushing the add event button at the bottom of the calendar
  //currently builds start and end times for the event in the form of yyyy-mm-ddThh:mm
  const handleEventAddButton = (event) => {
    event.preventDefault();
    const dateFormatting = (pickedDate + "T" + startTime);
    console.log("pickedDate ", pickedDate, "startTime ", startTime);
    console.log(dateFormatting);
    const start = new Date(dateFormatting);
    console.log("Start ", start);
    const end = new Date(dateFormatting);
    console.log("Start ", start);
    end.setHours(Number(end.getHours()) + Number(duration));
    console.log(
      "Start time: ",
      start,
      " End time: ",
      end,
      " Title: ",
      title,
      " Duration: ",
      duration
    );
    if (start < end && start != null && duration != null && title != null) {
      let newEvent = {
        id: createEventId(),
        title,
        start: start,
        end: end,
      };
      let tempEvents = events;
      for (let i = 0; i < tempEvents.length; i++) {
        if (tempEvents[i].id === prevEvent.id) {
          console.log("Poistetaa elementti", tempEvents[i]);
          tempEvents.splice(i, 1);
          setEvents(tempEvents);
          break;
        };
      };
      setPrevEvent(newEvent);
      if(!(isOverlapping(newEvent))){

        setEvents((events) => [...events, newEvent]);
        let weekendCheck = new Date(newEvent.start);
        checkIsWeekend(weekendCheck);
        props.setNewPartyReservation(newEvent);
      } else {
        alert("New event is overlapping with another and cannot be added!");
      };
    } else {
      alert(
        "All required fields are not filled!"
      );
    }
  };

  //Check if new event overlaps with any of the events already in the calendar
  //Returns true if event would overlap, false if no overlap detected
  //Function checks if overlapEvent overlaps with some already existing event in the events array
  const isOverlapping = (overlapEvent) => {
    const eventArray = events;

    for(let i in eventArray){
      //Overlap = true if overlapping event starts during existing event (ex: event from 10-12, overlap starts at 11)
      console.log("Checking if1");
      if(overlapEvent.start > new Date(eventArray[i].start) && overlapEvent.start < new Date(eventArray[i].end)){
        return true;
      };

      console.log("Checking if2");
      //Overlap = true if overlapping event ends during existing event (ex: event from 10-12, overlap ends at 11)
      if(overlapEvent.end > new Date(eventArray[i].start) && overlapEvent.end < new Date(eventArray[i].end)){
        return true;
      };

      console.log("Checking if3");
      //Sama alku ja loppu OK, mutta pitää tarkistaa jos alut yhtäsuuret mutta eri loppu
      //Overlap = true if overlapping event happens during another event (ex: event from 9-12, overlapping from 10-13)
      if(overlapEvent.start < new Date(eventArray[i].start) && overlapEvent.end > new Date(eventArray[i].end)){
        return true;
      };

      console.log("Checking if4");
      //Overlap = true if overlapping event starts at exactly the same time as another event
      if(overlapEvent.start.getTime() === (new Date(eventArray[i].start)).getTime()){
        return true;
      }

      console.log("Checking if5");
      //Overlap true if overlapping event stars before existing and ends during or at same time
      if(overlapEvent.start < new Date(eventArray[i].start) && overlapEvent.end >= new Date(eventArray[i].end)){
        return true;
      };
    };
    //If nothing above true, return false. Events do not overlap.
    console.log("Returning false");
    return false;
  };

  //Handle changing the date of the party by changing value of pickedState to match
  const handleDateChange = () => {
    const picked = document.getElementById("partyDate").value;
    setPickedDate(picked);
  };

  //Handle changing the party starting time field by changing value of startTime state
  const handleStartChange = () => {
    const picked = document.getElementById("startSelector").value;
    console.log("Start changed to ", picked);
    setStartTime(picked);
  };

  //Handle changing the title field of the party by changing value of title state
  const handleTitleChange = () => {
    const title = document.getElementById("eventTitle").value;
    console.log("Title changed to ", title);
    setTitle(title);
  };

  //Handle changing the duration of the party field by changing value of the duration state
  const handleDurationChange = () => {
    const picked = document.getElementById("durationSelector").value;
    console.log("Duration changed to ", duration);
    setDuration(picked);
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
        /* HeaderToolbar works in a funny way, if there is a 'space' between elements,
        there will be a gap between them in the calendar also, if a comma they will instead touch eachother
        Try for example: left:"prev,next today"
        */
        headerToolbar={{
          left: "prev next today",
          center: "title",
          right: "timeGridWeek timeGridDay",
        }}
      />

      {/*Data entering form to create reservations*/}
      <form style={{ width: "100%", marginTop: "2%" }}>
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
            <label htmlFor="startSelector">Select party start: </label>
            <NativeSelect
              value={startTime}
              onChange={handleStartChange}
              inputProps={{
                name: "startSelector",
                id: "startSelector",
                style: { fontSize: "medium", lineHeight: "1.50rem" },
              }}
            >
              <option value="08:00">8:00</option>
              <option value="08:30">8:30</option>
              <option value="09:00">9:00</option>
              <option value="09:30">9:30</option>
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
            </NativeSelect>
          </Grid>

          <Grid item xs={6}>
            <label htmlFor="duration">Select party duration: </label>
            <NativeSelect
              value={duration}
              onChange={handleDurationChange}
              inputProps={{
                name: "durationSelector",
                id: "durationSelector",
                style: { fontSize: "medium", lineHeight: "1.50rem" },
              }}
            >
              <option value={1}>One hour</option>
              <option value={2}>Two hours</option>
              <option value={3}>Three hours</option>
              <option value={8}>Eight hours</option>
            </NativeSelect>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleEventAddButton}
              className={classes.bigButton}
            >
              Add event + debug
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};
export default Calendar;
