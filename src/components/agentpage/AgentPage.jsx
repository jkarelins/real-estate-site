import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import AddNewAdvert from "../addnewadvert/AddNewAdvert";

class AgentPage extends Component {
  render() {
    if (this.props.user) {
      if (!this.props.user.agentConfirmedByManager) {
        return <h4>Sorry. Your account is suspended by your manager.</h4>;
      } else {
        return (
          <div>
            <h4>
              Welcome back: {this.props.user.email} - you are loged in as agent
              of "{this.props.user.agency.name}" company
            </h4>
            {!this.props.user.agentConfirmedByManager ? (
              "Your profile is not confirmed yet. Contact your manager"
            ) : (
              <Fragment>
                "Your account is confirmed by manager"
                <AddNewAdvert />
              </Fragment>
            )}
          </div>
        );
      }
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

export default connect(mapStateToProps)(AgentPage);
