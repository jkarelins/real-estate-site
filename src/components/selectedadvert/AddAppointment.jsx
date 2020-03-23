import React, { Component } from "react";

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
  };

  onTimeChange = time => this.setState({ ...this.state, time });

  submitAppointment = e => {
    e.preventDefault();
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
          <label htmlFor="hours">Hours:</label>
          <select name="hours" onChange={this.handleChange}>
            {this.getHours(24)}
          </select>
          <label htmlFor="minutes">
            {" "}
            :{" "}
            <select name="minutes" onChange={this.handleChange}>
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
