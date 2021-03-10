import React from 'react';
import Paper from '@material-ui/core/Paper';
import {ViewState, EditingState, IntegratedEditing} from '@devexpress/dx-react-scheduler';
import{Scheduler, WeekView, Appointments, AppointmentForm, AppointmentTooltip, ConfimationDialog} from '@devexpress/dx-react-scheduler-material-ui';

const SchedulerTest = () => {
    const currentDate = '2021-03-11';
    const appointments = [
        { title:'Manager meeting', startDate: '2021-03-11T13:30', endDate: '2021-03-11T14:00', id:0, game:'SoG project' }
    ]

return(
    <Paper width={300}>
        <Scheduler data = {appointments}
        height={400}
        firstDayOfWeek={1}
        >
            <ViewState currentDate = {currentDate}/>
            <WeekView startDayHour={8}
            endDayHour = {17}
            />
            <Appointments/>
        </Scheduler>
    </Paper>
)
}

export default SchedulerTest