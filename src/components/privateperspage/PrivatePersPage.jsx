import React, { Component } from "react";
import { connect } from "react-redux";
import { addAdverts } from "../../actions/user";
import UserHasNoCredits from "./UserHasNoCredits";
import UserHasCredits from "./UserHasCredits";

const initialState = {
  addExtra: 0
};

class PrivatePersPage extends Component {
  state = initialState;

  addAdverts = e => {
    e.preventDefault();
    const data = {
      addExtra: this.state.addExtra
    };
    this.props.addAdverts(data);
    this.setState(initialState);
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    if (
      this.props.user.paidAdvertLimit === 0 &&
      this.props.user.freeAdvertLimit === 0
    ) {
      return (
        <UserHasNoCredits
          user={this.props.user}
          addAdverts={this.addAdverts}
          handleChange={this.handleChange}
          addExtra={this.state.addExtra}
        />
      );
    } else {
      return (
        <UserHasCredits
          user={this.props.user}
          addAdverts={this.addAdverts}
          handleChange={this.handleChange}
          addExtra={this.state.addExtra}
        />
      );
    }
  }
}

function mapStateToProps(state) {
  if (state.userReducer) {
    return {
      user: state.userReducer.user
    };
  }
}

export default connect(mapStateToProps, { addAdverts })(PrivatePersPage);
