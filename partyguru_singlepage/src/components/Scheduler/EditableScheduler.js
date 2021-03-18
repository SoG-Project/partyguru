/*import React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  WeekView,
  MonthView,
  Toolbar,
  DateNavigator,
  TodayButton,
  ViewSwitcher,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  ConfirmationDialog,
} from '@devexpress/dx-react-scheduler-material-ui';

import { appointmentsData } from './appointmentsData';

export default class EditableScheduler extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: appointments,
      currentDate: new Date(),
    };

    this.commitChanges = this.commitChanges.bind(this);
  }

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map(appointment => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
      }
      if (deleted !== undefined) {
        data = data.filter(appointment => appointment.id !== deleted);
      }
      return { data };
    });
  }

  render() {
    const { currentDate, data } = this.state;

    return (
      <Paper>
        <Scheduler
          data={data}
          height={690}
          firstDayOfWeek={1}
        >
          <ViewState
            currentDate={currentDate}
            defaultCurrentViewName={"Month"}
          />
          <MonthView/>
          <WeekView
          startDayHour={10}
          endDayHour={20}
          />
          <DayView
            startDayHour={10}
            endDayHour={20}
          />
          <EditingState
            onCommitChanges={this.commitChanges}
          />
          <Toolbar/>
          <DateNavigator/>
          <TodayButton/>
          <ViewSwitcher/>
          <IntegratedEditing />
          <ConfirmationDialog />
          <Appointments />
          <AppointmentTooltip
            showOpenButton
            showDeleteButton
          />
          <AppointmentForm />
        </Scheduler>
      </Paper>
    );
  }
}
*/