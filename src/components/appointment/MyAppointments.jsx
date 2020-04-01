import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

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
    if (this.props.user) {
      if (this.props.appointments) {
        const { appointments, canceled } = this.props;
        return (
          <div className="container mt-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Active Appointments</h5>
                <hr />
                {appointments.map((appointment, i) => (
                  <ShowAppointment
                    key={i}
                    appointment={appointment}
                    cancelAppointment={() =>
                      this.cancelAppointment(appointment.id)
                    }
                  />
                ))}
              </div>
            </div>
            <hr className="my-3" />
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Canceled Appointments</h5>
                <hr />
                {canceled.map((appointment, i) => (
                  <ShowAppointment
                    key={i}
                    appointment={appointment}
                    cancelAppointment={() =>
                      this.cancelAppointment(appointment.id)
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="alert alert-info" role="alert">
            Sorry. your appointments was not found.
          </div>
        );
      }
    } else {
      return (
        <div className="row mt-3 text-center">
          <div className="col-12">
            <h4>Now you can Login to access your account.</h4>
          </div>
          <div className="col-12">
            <Link className="btn btn-outline-success" to="/login">
              Login
            </Link>
            <Link className="btn btn-outline-info ml-1" to="/register">
              Sign Up
            </Link>
          </div>
        </div>
      );
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
