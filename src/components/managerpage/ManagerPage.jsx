import React, { Component } from "react";
import { connect } from "react-redux";
import { getAgencyAgents } from "../../actions/advert";

class ManagerPage extends Component {
  componentDidMount() {
    if (this.props.user) {
      this.props.getAgencyAgents();
    }
  }
  render() {
    const managersList = this.props.agents
      ? this.props.agents.length !== 0
        ? this.props.agents.map((agent, i) => (
            <p key={i}>
              {agent.username} - {agent.email}
              {agent.isVe}
            </p>
          ))
        : "Sorry, you have no managers yet."
      : "Something went wrong";
    return (
      <div>
        <h4>
          Welcome back: {this.props.user.email} - you are loged in as manager of
          "{this.props.user.agency.name}" company
        </h4>
        <p>Your agency agents:</p>
        {managersList}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer.user,
    agents: state.advertReducer.agencyAgents
  };
}

export default connect(mapStateToProps, { getAgencyAgents })(ManagerPage);
