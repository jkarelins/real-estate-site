import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getAppointments, cancelAppointment } from "../../actions/appointment";
import ShowAppointment from "./ShowAppointment";

class MyAppointment extends Component {
  state = {
    update: false
  };

  componentDidMount = () => {
    if (this.props.user) {
      this.props.getAppointments();
    }
  };

  cancelAppointment = id => {
    this.props.cancelAppointment(id);
  };

  render() {
    if (this.props.appointments) {
      const { appointments, canceled } = this.props;
      return (
        <Fragment>
          <h4>Active Appointments</h4>
          {appointments.map((appointment, i) => (
            <ShowAppointment
              key={i}
              appointment={appointment}
              cancelAppointment={() => this.cancelAppointment(appointment.id)}
            />
          ))}
          <hr />
          <h4>Canceled Appointments</h4>
          {canceled.map((appointment, i) => (
            <ShowAppointment
              key={i}
              appointment={appointment}
              cancelAppointment={() => this.cancelAppointment(appointment.id)}
            />
          ))}
        </Fragment>
      );
    } else {
      return <h4>Sorry. Your appointments was not found.</h4>;
    }
  }
}

function mapStateToProps(state) {
  return {
    appointments: state.appointmentReducer.appointments.filter(
      appointment => appointment.status === "published"
    ),
    canceled: state.appointmentReducer.appointments.filter(
      appointment => appointment.status === "canceled"
    ),
    user: state.userReducer
  };
}

export default connect(mapStateToProps, { getAppointments, cancelAppointment })(
  MyAppointment
);
