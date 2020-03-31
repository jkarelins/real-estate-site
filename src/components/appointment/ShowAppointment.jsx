import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Moment from "react-moment";

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
    const date = new Date(this.props.appointment.date);
    const configuredDate = `${date.getMonth() +
      1}-${date.getDate()}-${date.getFullYear()}`;
    this.setState({ ...this.props.appointment, date: configuredDate });
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
        <Fragment>
          <p className="card-text">
            Planed Appointment Time: {this.state.date} @ {appointment.hours} :{" "}
            {appointment.minutes}
            <br />
            Requested By: {appointment.name} - {appointment.email}
            <br />
            Phone Nr.: {appointment.phone}
          </p>
          <p className="card-text">
            {appointment.text}
            <br />
            Was created: <Moment fromNow>{appointment.createdAt}</Moment>, last
            changes: <Moment fromNow>{appointment.updatedAt}</Moment>
          </p>
          {this.props.appointment.status === "canceled" ? (
            ""
          ) : (
            <div>
              <button
                className="btn btn-sm btn-warning"
                onClick={() => this.updateMode("enableEdit")}
              >
                EDIT
              </button>
              <button
                className="btn btn-sm btn-danger ml-2"
                onClick={() => this.props.cancelAppointment(appointment.id)}
              >
                CANCEL
              </button>
            </div>
          )}
          <hr />
        </Fragment>
      );
    } else if (this.props.appointment && this.state.updateMode) {
      return (
        <div>
          <div>
            <h5>Edit appointment</h5>
            <hr />
            <form onSubmit={e => this.submitAppointment(e)}>
              <div className="col-4">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Date: </span>
                  </div>
                  <input
                    type="date"
                    name="date"
                    className="form-control"
                    value={this.state.date}
                    onChange={this.handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-6 mt-3">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Hours: </span>
                  </div>
                  <select
                    name="hours"
                    className="custom-select"
                    onChange={this.handleChange}
                    value={this.state.hours}
                    required
                  >
                    {this.getHours(24)}
                  </select>
                  <select
                    name="minutes"
                    className="custom-select"
                    onChange={this.handleChange}
                    value={this.state.minutes}
                    required
                  >
                    <option value="0">0</option>
                    <option value="15">15</option>
                    <option value="30">30</option>
                    <option value="45">45</option>
                  </select>
                  <div className="input-group-append">
                    <span className="input-group-text"> minutes</span>
                  </div>
                </div>
              </div>
              <div className="col-6 mt-3">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Email: </span>
                  </div>
                  <input
                    type="text"
                    readOnly
                    name="email"
                    className="form-control"
                    value={this.state.email}
                  />
                </div>
              </div>
              <div className="col-6 mt-3">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Phone number: </span>
                  </div>
                  <input
                    type="text"
                    readOnly
                    name="phone"
                    className="form-control"
                    value={this.state.phone}
                  />
                </div>
              </div>
              <div className="col-6 mt-3">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Phone number: </span>
                  </div>
                  <input
                    type="text"
                    readOnly
                    name="name"
                    className="form-control"
                    value={this.state.name}
                    required
                  />
                </div>
              </div>
              <div class="form-group mx-3 mt-3">
                <label>Appointment Text</label>
                <textarea
                  name="text"
                  rows="7"
                  placeholder="Message"
                  className="form-control"
                  value={this.state.text}
                  onChange={this.handleChange}
                  required
                />
              </div>

              <div className="mt-3 ml-3">
                <input
                  type="submit"
                  className="btn btn-success"
                  value="Save Changes"
                />
                {this.props.appointment.status === "canceled" ? (
                  ""
                ) : (
                  <button
                    type="button"
                    className="btn btn-warning ml-3"
                    onClick={() => this.updateMode("cancelEdit")}
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      );
    } else {
      return <h4>Sorry. This appointment was not found.</h4>;
    }
  }
}

export default connect(null, { changeAppointment })(ShowAppointment);
