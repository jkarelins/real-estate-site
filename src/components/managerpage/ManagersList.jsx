import React, { Component, Fragment } from "react";

export default class ManagersList extends Component {
  render() {
    if (this.props.agents) {
      const managersList = this.props.agents
        ? this.props.agents.length !== 0
          ? this.props.agents.map((agent, i) => (
              <p key={i}>
                {agent.username} - {agent.email}{" "}
                {agent.agentConfirmedByManager ? (
                  <Fragment>
                    "Confirmed"
                    <button
                      type="button"
                      onClick={() =>
                        this.props.toggleAccount(agent.id, "DISABLE")
                      }
                    >
                      Disable
                    </button>
                  </Fragment>
                ) : (
                  <Fragment>
                    "Not Confirmed"
                    <button
                      type="button"
                      onClick={() =>
                        this.props.toggleAccount(agent.id, "ENABLE")
                      }
                    >
                      Enable Profile
                    </button>
                  </Fragment>
                )}{" "}
              </p>
            ))
          : "Sorry, you have no agents yet."
        : "Something went wrong";
      return <div>{managersList}</div>;
    } else {
      return <h4>Loading...</h4>;
    }
  }
}
