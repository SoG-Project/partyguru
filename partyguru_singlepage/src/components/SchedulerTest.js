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

const SchedulerTest = () => {

    const appointments = [
        { title:'Manager meeting', startDate: '2021-03-11T13:30', endDate: '2021-03-11T14:00', id:0 }
    ]

    const commitChanges = ({newAppointment}) => {
        appointments.concat(newAppointment)
    }

return(
    <Paper>
        <Scheduler data = {appointments}
        height={690}
        firstDayOfWeek={1}>
            <ViewState
            defaultCurrentViewName="Month"/>
            <MonthView/>
            <WeekView startDayHour={8}
            endDayHour= {18}/>
            <DayView startDayHour={8}
            endDayHour={18}/>
            <EditingState
            onCommitChanges={commitChanges}
            />
            <Toolbar/>
            <DateNavigator/>
            <TodayButton/>
            <ViewSwitcher/>
            <Appointments/>
        </Scheduler>
    </Paper>
)
}

export default SchedulerTest