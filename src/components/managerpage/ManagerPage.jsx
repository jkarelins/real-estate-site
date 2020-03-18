import React, { Component } from "react";
import { connect } from "react-redux";

class ManagerPage extends Component {
  render() {
    return (
      <div>
        hello
        <h4>
          Welcome back: {this.props.user.email} - you are loged in as manager of
          "{this.props.user.agency.name}" company
        </h4>
        <p>Here is going to be list of all agents</p>
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

export default connect(mapStateToProps)(ManagerPage);
