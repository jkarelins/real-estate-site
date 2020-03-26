import React, { Component } from "react";
import { connect } from "react-redux";
import { changeAppointment } from "../../actions/appointment";

const initialState = {
  id: 0,
  date: "",
  email: "",
  phone: "",
  name: "",
  text: "",
  hours: 0,
  minutes: 0,
  updateMode: false
};

class ShowAppointment extends Component {
  state = initialState;

  componentDidMount = () => {
    this.setState(this.props.appointment);
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onTimeChange = time => this.setState({ ...this.state, time });

  submitAppointment = e => {
    e.preventDefault();
    this.props.changeAppointment(this.state, this.state.id);
    this.setState(initialState);
  };

  getHours = max => {
    const hours = [...Array(max).keys()];
    return hours.map(hour => (
      <option value={hour} key={hour}>
        {hour}
      </option>
    ));
  };

  updateMode = action => {
    if (action === "enableEdit") {
      this.setState({ updateMode: true });
    } else if (action === "cancelEdit") {
      this.setState({ updateMode: false });
    }
  };

  render() {
    if (this.props.appointment && !this.state.updateMode) {
      const { appointment } = this.props;
      return (
        <div>
          <p>
            Planed: {appointment.date} @{appointment.hours} :{" "}
            {appointment.minutes}
            <br />
            Planed by : {appointment.name} - {appointment.email}
            <br />
            tel: {appointment.phone}
          </p>
          <p>
            {appointment.text}
            <br />
            Was created: {appointment.createdAt}, last changes:{" "}
            {appointment.updatedAt}
          </p>
          {this.props.appointment.status === "canceled" ? (
            ""
          ) : (
            <div>
              <button onClick={() => this.updateMode("enableEdit")}>
                Edit
              </button>
              <button
                onClick={() => this.props.cancelAppointment(appointment.id)}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      );
    } else if (this.props.appointment && this.state.updateMode) {
      const { appointment } = this.props;

      return (
        <div>
          <div>
            <h5>New appointment</h5>
            <form onSubmit={e => this.submitAppointment(e)}>
              <input
                type="date"
                name="date"
                value={this.state.date}
                onChange={this.handleChange}
                required
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
                required
              />
              <br />
              <input
                type="tel"
                name="phone"
                placeholder="phone nr."
                value={this.state.phone}
                onChange={this.handleChange}
                required
              />
              <br />
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={this.state.name}
                onChange={this.handleChange}
                required
              />
              <br />
              <textarea
                name="text"
                placeholder="Message"
                value={this.state.text}
                onChange={this.handleChange}
                required
              />
              <br />
              <input type="submit" value="Save Changes" />
            </form>
          </div>
          {this.props.appointment.status === "canceled" ? (
            ""
          ) : (
            <div>
              <button onClick={() => this.updateMode("cancelEdit")}>
                Cancel Edit
              </button>
              <button
                onClick={() => this.props.cancelAppointment(appointment.id)}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      );
    } else {
      return <h4>Sorry. This appointment was not found.</h4>;
    }
  }
}

export default connect(null, { changeAppointment })(ShowAppointment);
