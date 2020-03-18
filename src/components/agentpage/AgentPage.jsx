import React, { Component } from "react";
import { connect } from "react-redux";

class AgentPage extends Component {
  render() {
    return (
      <div>
        hello
        <h4>
          Welcome back: {this.props.user.email} - you are loged in as agent of "
          {this.props.user.agency.name}" company
        </h4>
        <p>
          {!this.props.user.agencyConfirmedByManager
            ? "Your profile is not confirmed yet. Contact your manager"
            : "Your account is confirmed, you can use it"}
        </p>
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

export default connect(mapStateToProps)(AgentPage);
