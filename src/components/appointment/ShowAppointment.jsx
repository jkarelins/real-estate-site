import React, { Component } from "react";
import { connect } from "react-redux";
import { getAppointment } from "../../actions/appointment";

class ShowAppointment extends Component {
  state = {
    id: 0,
    date: "",
    hours: 0,
    minutes: 0,
    email: "",
    phone: "",
    name: "",
    text: "",
    randomAddress: "",
    updateMode: false
  };

  componentDidMount = () => {
    const { randAddress } = this.props.match.params;
    this.props.getAppointment(randAddress);
    this.setState(this.props.appointment);
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.appointment !== this.props.appointment) {
      this.setState({
        ...this.state,
        ...this.props.appointment
      });
    }
  }

  render() {
    if (this.props.appointment) {
      const { appointment } = this.props;
      return (
        <div>
          <h2>
            {appointment.date}, time: {appointment.hours} :{" "}
            {appointment.minutes}
          </h2>
          <p>
            Created by: {appointment.name}, {appointment.email} <br />
            {appointment.text}
          </p>
        </div>
      );
    } else {
      return <h4>Sorry. This appointment was not found.</h4>;
    }
  }
}

function mapStateToProps(state) {
  return {
    appointment: state.appointmentReducer.selectedAppointment
  };
}

export default connect(mapStateToProps, { getAppointment })(ShowAppointment);
