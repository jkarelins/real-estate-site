import React, { Component } from "react";
import { connect } from "react-redux";
import { addAdverts } from "../../actions/user";
import { getAgencyAgents, toggleAgentAcc } from "../../actions/advert";
import ManagersList from "./ManagersList";
import TopUpAgencyBalance from "./TopUpAgencyBalance";

const initialState = {
  addExtra: 0
};

class ManagerPage extends Component {
  state = initialState;

  componentDidMount() {
    if (this.props.user) {
      this.props.getAgencyAgents();
    }
  }

  toggleAccount = (agentId, action) => {
    this.props.toggleAgentAcc(agentId, action);
  };

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
    return (
      <div>
        <h4>
          Welcome back: {this.props.user.email} - you are loged in as manager of
          "{this.props.user.agency.name}" company
        </h4>
        <p>
          {this.props.user.freeAdvertLimit !== 0
            ? `Thank you for registration. You can paste ${this.props.user.freeAdvertLimit} free advertisements`
            : ""}
        </p>
        <p>
          Your agency balance is {this.props.user.agency.advertBalance}{" "}
          advertisements
        </p>
        <TopUpAgencyBalance
          user={this.props.user}
          addAdverts={this.addAdverts}
          handleChange={this.handleChange}
          addExtra={this.state.addExtra}
        />
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

export default connect(mapStateToProps, {
  getAgencyAgents,
  toggleAgentAcc,
  addAdverts
})(ManagerPage);
