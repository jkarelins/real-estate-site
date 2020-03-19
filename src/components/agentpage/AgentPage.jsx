import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import AddNewAdvert from "../addnewadvert/AddNewAdvert";

class AgentPage extends Component {
  render() {
    if (this.props.user) {
      if (!this.props.user.agentConfirmedByManager) {
        return (
          <h4>
            Sorry. Your account is suspended or not confirmed by your manager.
          </h4>
        );
      } else {
        return (
          <div>
            <h4>
              Welcome back: {this.props.user.email} - you are loged in as agent
              of "{this.props.user.agency.name}" company
            </h4>
            {this.props.user.agency.advertBalance !== 0 ? (
              <p>
                You can post {this.props.user.agency.advertBalance}{" "}
                advertisement (Company Balance){" "}
              </p>
            ) : (
              <p>
                You can not add any advertisements now. Please ask your manager
                to top up balance.
              </p>
            )}
            <Fragment>
              "Your account is confirmed by manager"
              <AddNewAdvert />
            </Fragment>
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
