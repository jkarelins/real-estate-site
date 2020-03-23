import React, { Component } from "react";
import { connect } from "react-redux";
import { createNewAppointment } from "../../actions/appointment";

const initialState = {
  date: "",
  email: "",
  phone: "",
  name: "",
  text: "",
  hours: 0,
  minutes: 0,
  success: false
};

class AddAppointment extends Component {
  state = initialState;

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onTimeChange = time => this.setState({ ...this.state, time });

  submitAppointment = e => {
    e.preventDefault();
    this.props.createNewAppointment(this.state);
    this.setState({ ...initialState, success: true });
  };

  getHours = max => {
    const hours = [...Array(max).keys()];
    return hours.map(hour => (
      <option value={hour} key={hour}>
        {hour}
      </option>
    ));
  };

  render() {
    if (this.props.appCreated) {
      return <h4>Thank you, your appointment request was sent.</h4>;
    } else {
      return (
        <div>
          <h5>New appointment</h5>
          <form onSubmit={e => this.submitAppointment(e)}>
            <input
              type="date"
              name="date"
              value={this.state.date}
              onChange={this.handleChange}
            />
            <br />
            <label htmlFor="hours">Hours:</label>
            <select name="hours" onChange={this.handleChange} required>
              {this.getHours(24)}
            </select>
            <label htmlFor="minutes">
              {" "}
              :{" "}
              <select name="minutes" onChange={this.handleChange} required>
                <option value="0">0</option>
                <option value="15">15</option>
                <option value="30">30</option>
                <option value="45">45</option>
              </select>
              minutes
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <br />
            <input
              type="tel"
              name="phone"
              placeholder="phone nr."
              value={this.state.phone}
              onChange={this.handleChange}
            />
            <br />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <br />
            <textarea
              name="text"
              placeholder="Message"
              value={this.state.text}
              onChange={this.handleChange}
            />
            <br />
            <input type="submit" value="New Appointment" />
          </form>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    appCreated: state.appointmentReducer.appointments.some(
      appointment =>
        appointment.advertId === state.advertReducer.selectedAdvert.id
    )
  };
}

export default connect(mapStateToProps, { createNewAppointment })(
  AddAppointment
);
