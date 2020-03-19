import React, { Component } from "react";
import { connect } from "react-redux";
import { getAgencyAgents, toggleAgentAcc } from "../../actions/advert";
import ManagersList from "./ManagersList";

class ManagerPage extends Component {
  componentDidMount() {
    if (this.props.user) {
      this.props.getAgencyAgents();
    }
  }

  toggleAccount = (agentId, action) => {
    this.props.toggleAgentAcc(agentId, action);
  };

  render() {
    return (
      <div>
        <h4>
          Welcome back: {this.props.user.email} - you are loged in as manager of
          "{this.props.user.agency.name}" company
        </h4>
        <p>Your agency agents:</p>
        <ManagersList
          agents={this.props.agents}
          toggleAccount={this.toggleAccount}
        />
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

export default connect(mapStateToProps, { getAgencyAgents, toggleAgentAcc })(
  ManagerPage
);
