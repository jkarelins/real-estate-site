import React, { Component } from "react";
import { connect } from "react-redux";
import UserHasNoCredits from "./UserHasNoCredits";
import UserHasCredits from "./UserHasCredits";
import PaymentWraper from "../pay/PaymentWraper";

const initialState = {
  topUp: false,
  success: false
};
class PrivatePersPage extends Component {
  state = initialState;

  topUp = () => {
    this.setState({
      topUp: true,
      success: false
    });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.user.paidAdvertLimit !== this.props.user.paidAdvertLimit) {
      this.setState({ ...initialState, success: true });
    }
  }

  render() {
    const haveCredits =
      this.props.user.paidAdvertLimit === 0 &&
      this.props.user.freeAdvertLimit === 0;
    return (
      <div>
        {this.state.success ? (
          <h4>Your account was successfuly charger for 10 EUR</h4>
        ) : (
          ""
        )}
        <button onClick={this.topUp}>Top Up Balance</button>
        {this.state.topUp ? <PaymentWraper /> : ""}
        {haveCredits ? (
          <UserHasNoCredits user={this.props.user} />
        ) : (
          <UserHasCredits user={this.props.user} />
        )}
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
