import React, { Component } from "react";
import { connect } from "react-redux";
import UserHasNoCredits from "./UserHasNoCredits";
import UserHasCredits from "./UserHasCredits";

class PrivatePersPage extends Component {
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
      return <UserHasNoCredits user={this.props.user} />;
    } else {
      return <UserHasCredits user={this.props.user} />;
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

export default connect(mapStateToProps)(PrivatePersPage);
