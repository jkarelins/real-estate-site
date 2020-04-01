import React, { Component } from "react";
import { connect } from "react-redux";
import { createNewAppointment } from "../../actions/appointment";
import { Fragment } from "react";

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
      return (
        <Fragment>
          <h4>Thank you, your appointment request was just sent.</h4>
        </Fragment>
      );
    } else {
      return (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">New appointment</h5>
            <form onSubmit={e => this.submitAppointment(e)}>
              <input
                type="date"
                name="date"
                className="form-control"
                value={this.state.date}
                onChange={this.handleChange}
                required
              />
              <div className="row mt-2">
                <div className="col-5">
                  <label htmlFor="hours">Hours:</label>
                  <select
                    className="custom-select"
                    name="hours"
                    onChange={this.handleChange}
                    required
                  >
                    {this.getHours(24)}
                  </select>
                </div>
                <div className="col-5">
                  <label htmlFor="minutes">Minutes</label>
                  <select
                    name="minutes"
                    onChange={this.handleChange}
                    className="custom-select"
                    required
                  >
                    <option value="0">0</option>
                    <option value="15">15</option>
                    <option value="30">30</option>
                    <option value="45">45</option>
                  </select>
                </div>
              </div>
              <input
                type="email"
                name="email"
                className="form-control mt-2"
                placeholder="email"
                value={this.state.email}
                onChange={this.handleChange}
                required
              />
              <input
                type="tel"
                name="phone"
                className="form-control mt-2"
                placeholder="phone nr."
                value={this.state.phone}
                onChange={this.handleChange}
                required
              />
              <input
                type="text"
                name="name"
                className="form-control mt-2"
                placeholder="Name"
                value={this.state.name}
                onChange={this.handleChange}
                required
              />
              <textarea
                name="text"
                placeholder="Message"
                className="form-control mt-2"
                value={this.state.text}
                onChange={this.handleChange}
                required
              />
              <input
                className="btn btn-sm btn-success mt-2"
                type="submit"
                value="New Appointment"
              />
            </form>
          </div>
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
