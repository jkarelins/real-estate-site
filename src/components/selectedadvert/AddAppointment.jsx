import React, { Component } from "react";
import TimePicker from "react-time-picker";

const initialState = {
  date: "",
  email: "",
  phone: "",
  name: "",
  text: "",
  hours: 0,
  minutes: 0
};
export default class AddAppointment extends Component {
  state = initialState;

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(this.state);
  };

  onTimeChange = time => this.setState({ ...this.state, time });

  submitAppointment = e => {
    e.preventDefault();
  };

  render() {
    return (
      <div>
        <h5>New appointment</h5>
        <form onSubmit={e => this.submitAppointment}>
          <input
            type="date"
            name="date"
            value={this.state.date}
            onChange={this.handleChange}
          />
          <br />
          <select name="hours" onChange={this.handleChange}>
            <option value="0">0</option>
            <option value="1">1</option>
          </select>
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
