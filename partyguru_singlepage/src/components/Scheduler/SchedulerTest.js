import React from 'react';
import Paper from '@material-ui/core/Paper';
import {ViewState, EditingState, IntegratedEditing} from '@devexpress/dx-react-scheduler';
import{
    Scheduler,
    Toolbar,
    DateNavigator,
    DayView, WeekView, MonthView,
    Appointments,
    TodayButton, 
    ViewSwitcher, 
    AppointmentForm, 
    AppointmentTooltip, 
    ConfirmationDialog
} from '@devexpress/dx-react-scheduler-material-ui';

//import {appointmentsData} from "./appointmentsData";

const SchedulerTest = () => {

    /*const [allAppointments, setAppointments] = useState(appointmentsData);

    const commitChanges = ({added, changed, deleted}) => {
        setAppointments((allAppointments) => {
            let data = allAppointments
            if(added) {
                const startingAddedID = data.lenght > 0 ? data[data.length - 1].id + 1 : 0
                data = [...data, {id:startingAddedID, ...added}]
                setAppointments(data)
            }
            console.log({data})
            if(changed){
            }
            if(deleted) {
                
            }
        })
    }
*/
return(
    <Paper>
        {/*Itse scheduler, sen tägien sisään tulee kaikki sen osat.
        Datana passataan appointments, jotka scheduler osaa ladata,
        heightillä määritellään korkeus pikseleinä,
        firstDayofWeek muuttaa vasemmanpuoleisinta päivää, 1 = maanantai */}
        <Scheduler
        height={600}
        firstDayOfWeek={1}>

            {/*Kapistus jolla saadaan jotain näkyviin, 
            defaultCurrentViewName määrittelee viewin ennen sen muuttelua*/}
            <ViewState
            defaultCurrentViewName="Week"/>

            {/*MonthView, WeekView ja DayView ovat tapoja näyttää eri määrä päiviä kalenterissa
            Month näyttää koko kuukauden, Week viikon ja sen päivät ja Day vain yhden päivän
            startDayHour ja endDayHour määrittelevät tunnit, joista päivät alkavat ja loppuvat */}
            <MonthView/>
            <WeekView startDayHour={8}
            endDayHour= {18}/>
            <DayView startDayHour={8}
            endDayHour={18}/>

            {/*Nämä kaksi mahdollistavat kaikenlaisen editoinnin
            Kommentoitu pois, ei välttämättä tarvita lopputuloksessa...
            <EditingState
            onCommitChanges={commitChanges}
            />
            <IntegratedEditing/>
            */}
            
            {/*Kalenterin yläosaan tuleva työkalupalkki, johon voidaan lisätä osia.
            Tässä tapauksessa lisätään:
            päivämäärä navigointi (ylävasemman nuolet),
            "TodayButton", jota painamalla pääsee takaisin tähän päivään,
            ViewSwitcher, jolla voidaan vaihtaa näkymää päivä/viikko/kuukausi -näkymien välillä */}
            <Toolbar/>
            <DateNavigator/>
            <TodayButton/>
            <ViewSwitcher/>

            {/*Renderöi varaukset kalenteriin*/}
            <Appointments/>

{/*         <ConfirmationDialog/>   Varausten tekemistä varten, kommentoitu pois kun ei varmuudella tarvita näitä
            <AppointmentTooltip
            showOpenButton
            showDeleteButton
            />
            <AppointmentForm/>
*/}
            

        </Scheduler>
    </Paper>
)
}

export default SchedulerTest