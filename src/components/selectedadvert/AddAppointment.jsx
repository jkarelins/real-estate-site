import React, { Component } from "react";
import TimePicker from "react-time-picker";

const initialState = {
  date: "",
  time: "12:00",
  email: "",
  phone: "",
  name: "",
  text: ""
};
export default class AddAppointment extends Component {
  state = initialState;

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onTimeChange = time => this.setState({ ...this.state, time });

  render() {
    return (
      <div>
        <h5>New appointment</h5>
        <form>
          <input
            type="date"
            name="date"
            value={this.state.date}
            onChange={this.handleChange}
          />
          {/* <input
            type="time"
            step="900"
            name="time"
            value={this.state.time}
            onChange={this.handleChange}
          /> */}
          <TimePicker onChange={this.onTimeChange} value={this.state.time} />
          <br />
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
        </form>
      </div>
    );
  }
}
