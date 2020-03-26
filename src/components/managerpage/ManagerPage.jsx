import React, { Component } from "react";
import { connect } from "react-redux";
import { getAgencyAgents, toggleAgentAcc } from "../../actions/advert";
import ManagersList from "./ManagersList";
import AddNewAdvert from "../addnewadvert/AddNewAdvert";
import PaymentWraper from "../pay/PaymentWraper";

const initialState = {
  topUp: false,
  success: false,
  amountInEUR: 0
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
    if (
      prevProps.user.agency.advertBalance !==
      this.props.user.agency.advertBalance
    ) {
      this.setState({ ...initialState, success: true });
    }
  }

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

        <div>
          {this.state.success ? (
            <h4>Your account was successfuly charged</h4>
          ) : this.state.topUp ? (
            <PaymentWraper amountInCents={+this.state.amountInEUR * 100} />
          ) : (
            <div>
              <label htmlFor="topUpSum">
                <input
                  type="number"
                  name="amountInEUR"
                  placeholder=""
                  min="1"
                  max="100"
                  step="1"
                  value={this.state.amountInEUR}
                  onChange={this.handleChange}
                />
                EUR
              </label>
              <button onClick={this.topUp}>Top Up Balance</button>
            </div>
          )}
        </div>

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
