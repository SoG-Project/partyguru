import React, { useEffect } from "react";
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
  InputLabel,
  CircularProgress,
} from "@material-ui/core";
import axios from "axios";
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

  const [productGurus, setProductGurus] = React.useState();
  const [currentGuru, setCurrentGuru] = React.useState();

//useEffect that should fire when props.productGuru changes, setting the states correctly
  useEffect(() => {

    console.log("propsit ", props);
    setCurrentGuru(props.productGurus[0]);
    console.log("CurrentGuru set to ", props.productGurus[0]);
    setProductGurus(props.productGurus);
    props.setCurrentGuruID(props.productGurus[0]._id);

    let newEvents = props.productGurus[0].timeswhenunavailable
    axios.get('/api/parties').then(response => {
      response.data.forEach(party =>{
        if (party.guruid === props.productGurus[0]._id) {
          let newEvent = {
            id: party._id,
            title: "Reserved",
            start: party.datetime,
            end: new Date(party.datetime).setHours(new Date(party.datetime).getHours()+party.duration),
            color: 'orange',
            party: true
          }
          newEvents && newEvents.push(newEvent)

        }
      })
      setEvents(newEvents)
    })

  }, []);

  /* useEffect(() => {
    console.log("Eventsiä muutettu: ", events);
    props.setGuruEvents(events);
    console.log("Guru eventsit muutettu");
  }, [events]); */

  //to Handle pushing the add event button at the bottom of the calendar
  //currently builds start and end times for the event in the form of yyyy-mm-ddThh:mm
  const handleEventAddButton = (event) => {
    /*Prevent default form submit*/
    event.preventDefault();
    /*Build correctly formed dates out of information the user has selected*/
    const dateFormatting = pickedDate + "T" + startTime;
    let startText = dateFormatting;
    const start = new Date(dateFormatting);
    const end = new Date(dateFormatting);
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
    /*If no data is empty, proceed with creating the event*/
    if (start < end && start != null && duration != null && title != null) {
      let newEvent = {
        id: createEventId(),
        title,
        start: start,
        end: end,
      };
      /*Delete previous event from calendar if one exists. 
      This makes it so the customer only has one event of their own in the calendar at a time */
      let tempEvents = events;
      for (let i = 0; i < tempEvents.length; i++) {
        if (tempEvents[i].id === prevEvent.id) {
          console.log("Poistetaa elementti", tempEvents[i]);
          tempEvents.splice(i, 1);
          setEvents(tempEvents);
          break;
        }
      }
      /*Set customers newly created event as prevEvent in case they want to change their timeslot so we can delete the old one */
      setPrevEvent(newEvent);
      /*Check that this new reservation is not overlapping with other events in the calendar */
      if (!isOverlapping(newEvent)) {
        /*If not overlapping, add to events useState (later backend through PartyPackage)
        Check if it is weekend for costcalculator purposes
      set this as a new partyReservation in PartyPackage.js and set the duration in PartyPackage.js. These are used by other props. */

        let allEvents = tempEvents.concat(newEvent);

        setEvents(allEvents);
        let weekendCheck = new Date(newEvent.start);
        checkIsWeekend(weekendCheck);
        props.setGuruEvents(events);
        props.setDuration(duration);
        props.setPartyStartTime(newEvent.start)
      } else {
        alert("New event is overlapping with another and cannot be added!");
      }
    } else {
      alert("All required fields are not filled!");
    }
  };

  //Check if new event overlaps with any of the events already in the calendar
  //Returns true if event would overlap, false if no overlap detected
  //Function checks if overlapEvent overlaps with some already existing event in the events array
  const isOverlapping = (overlapEvent) => {
    const eventArray = events;

    for (let i in eventArray) {
      //Overlap = true if overlapping event starts during existing event (ex: event from 10-12, overlap starts at 11)
      if (
        overlapEvent.start > new Date(eventArray[i].start) &&
        overlapEvent.start < new Date(eventArray[i].end)
      ) {
        return true;
      }
      //Overlap = true if overlapping event ends during existing event (ex: event from 10-12, overlap ends at 11)
      if (
        overlapEvent.end > new Date(eventArray[i].start) &&
        overlapEvent.end < new Date(eventArray[i].end)
      ) {
        return true;
      }
      //Sama alku ja loppu OK, mutta pitää tarkistaa jos alut yhtäsuuret mutta eri loppu
      //Overlap = true if overlapping event happens during another event (ex: event from 9-12, overlapping from 10-13)
      if (
        overlapEvent.start < new Date(eventArray[i].start) &&
        overlapEvent.end > new Date(eventArray[i].end)
      ) {
        return true;
      }
      //Overlap = true if overlapping event starts at exactly the same time as another event
      if (
        overlapEvent.start.getTime() === new Date(eventArray[i].start).getTime()
      ) {
        return true;
      }
      //Overlap true if overlapping event stars before existing and ends during or at same time
      if (
        overlapEvent.start < new Date(eventArray[i].start) &&
        overlapEvent.end >= new Date(eventArray[i].end)
      ) {
        return true;
      }
    }
    //If nothing above true, return false. Events do not overlap.
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
    console.log("Duration changed to ", picked);
    setDuration(picked);
    props.setDuration(picked);
  };

  //Change currently selected guru to diplay his calendar
  //index is the value selected in the guru dropdown
  const handleGuruChange = () => {
    let index = document.getElementById("guruSelector").value;
    let guruName = productGurus[index].name;
    setCurrentGuru(guruName);


    // Getting the relevant parties from the database on guru change
    let newEvents = props.productGurus[index].timeswhenunavailable
     axios.get('/api/parties').then(response => {
      response.data.forEach(party =>{
        if (party.guruid === props.productGurus[index]._id) {
          let newEvent = {
            id: party._id,
            title: "Reserved",
            start: party.datetime,
            end: new Date(party.datetime).setHours(new Date(party.datetime).getHours()+party.duration),
            color: 'orange',
            party: true
          }
          // Ensures that there will be no duplicates
          if(newEvents.some(e => e.id === newEvent.id))
            console.log("Duplicate id")
          else newEvents.push(newEvent)
        }
      })
      setEvents(newEvents)
    })
    props.setCurrentGuruID(productGurus[index]._id);
  };

  //Check if date of party is on weekend (Saturday or Sunday)
  //If on weekend, set isWeekend to true in PartyPackage.js, if not, set to false
  //isWeekend is used to calculate the total cost of the party in CostCalculator
  const checkIsWeekend = (partyDate) => {
    let partyDay = partyDate.getDay();
    if (partyDay === 6 || partyDay === 0) {
      props.setIsWeekend(true);
    } else {
      props.setIsWeekend(false);
      return;
    }
  };

  return (
    <Paper
      elevation={5}
      style={{
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
            {/*Input field for the title of the event the customer is creating */}
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
            {/*Select starting time of party. Currently options are just simply hard-coded but it should be sufficient */}
            <NativeSelect
              value={startTime}
              onChange={handleStartChange}
              inputProps={{
                name: "startSelector",
                id: "startSelector",
                style: { fontSize: "medium", lineHeight: "1.50rem" },
              }}
            >
              {/*NOTE: VALUES MUST BE IN FORMAT 00:00. ENTERING A VALUE SUCH AS 9:00 WILL CAUSE INVALID DATES*/}
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
            {/*Selection field for the duration of the party. Hard-coded options again. Add more simply by entering another option line */}
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
            {/*Button to add current event to the calendar. 
            The calendar could probably in theory be fully responsive by updating all values constantly through for example useEffects.*/}
            <Button
              variant="contained"
              color="primary"
              onClick={handleEventAddButton}
              className={classes.bigButton}
            >
              Add event
            </Button>
            <Grid item xs={6}>
              <Typography gutterBottom style={{ fontSize: "1.5rem" }}>
                Didn't find a suitable timeslot? Below you can change the guru
                hosting your party here and see if someone else is available!
              </Typography>
            </Grid>
            <Grid item xs={6} style={{ marginBottom: "1%" }}>
              {productGurus ? (
                <div>
                  <InputLabel
                    id="guruSelectorLabel"
                    style={{ fontSize: "small" }}
                  >
                    Selected Guru
                  </InputLabel>
                  <NativeSelect
                    style={{ width: "auto" }}
                    inputProps={{
                      name: "guruSelector",
                      id: "guruSelector",
                      style: { fontSize: "medium", lineHeight: "1.6rem" },
                    }}
                    value={currentGuru.name}
                    onChange={handleGuruChange}
                  >
                    {productGurus.map((guru, index) => (
                      <option key={guru._id} value={index}>
                        {guru.name}
                      </option>
                    ))}
                  </NativeSelect>
                </div>
              ) : (
                <div>
                  {/*This area is rendered while the package has not been fetched, usually for a very brief amount of time*/}
                  <Typography variant="h4">Component loading...</Typography>
                  <CircularProgress
                    color="secondary"
                    disableShrink
                    size="15vh"
                    style={{ margin: "3%" }}
                  />
                </div>
              )}
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};
export default Calendar;
