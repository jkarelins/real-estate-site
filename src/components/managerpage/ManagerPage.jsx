import React, { Component } from "react";
import { connect } from "react-redux";
import { getAgencyAgents, toggleAgentAcc } from "../../actions/advert";
import ManagersList from "./ManagersList";
import AddNewAdvert from "../addnewadvert/AddNewAdvert";
import PaymentWraper from "../pay/PaymentWraper";

const initialState = {
  topUp: false,
  success: false
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

  topUp = () => {
    this.setState({
      topUp: true,
      success: false
    });
  };

  componentDidUpdate(prevProps) {
    // console.log(prevProps);
    if (
      prevProps.user.agency.advertBalance !==
      this.props.user.agency.advertBalance
    ) {
      this.setState({ ...initialState, success: true });
    }
  }

  render() {
    return (
      <div>
        <h4>
          Welcome back: {this.props.user.email} - you are loged in as manager of
          "{this.props.user.agency.name}" company
        </h4>
        <AddNewAdvert />
        <p>
          {this.props.user.freeAdvertLimit !== 0
            ? `Thank you for registration. You can paste ${this.props.user.freeAdvertLimit} free advertisements`
            : ""}
        </p>
        <p>
          Your agency balance is {this.props.user.agency.advertBalance}{" "}
          advertisements
        </p>
        {this.state.success ? (
          <h4>Your account was successfuly charger for 10 EUR</h4>
        ) : (
          ""
        )}
        <button onClick={this.topUp}>Top Up Balance</button>
        {this.state.topUp ? <PaymentWraper /> : ""}

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
  toggleAgentAcc
})(ManagerPage);
