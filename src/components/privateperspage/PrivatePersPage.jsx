import React, { Component } from "react";
import { connect } from "react-redux";

const initialState = {
  addExtra: 0
};

class PrivatePersPage extends Component {
  state = initialState;

  addAdverts = () => {
    const data = {
      userId: this.props.user.id,
      addExtra: this.state.addExtra
    };
    this.props.addAdverts(data);
    this.setState(initialState);
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(this.state);
  };

  render() {
    return (
      <div>
        <h4>
          Welcome back: {this.props.user.username} - you are loged in as private
          person.
        </h4>
        <p>
          As private person you can publish 1 free advertisement monthly. You
          can publish more {this.props.user.freeAdvertLimit} free advertisement.
        </p>
        <form onSubmit={this.addAdverts}>
          <label htmlFor="addAdverts">
            Add more advertisements
            <input
              type="number"
              min="1"
              max="20"
              name="addExtra"
              value={this.state.addExtra}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Add" />
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  if (state.userReducer) {
    return {
      user: state.userReducer.user
    };
  }
}

export default connect(mapStateToProps)(PrivatePersPage);
