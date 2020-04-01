import React, { Component, Fragment } from "react";

export default class ManagersList extends Component {
  render() {
    if (this.props.agents) {
      const managersList = this.props.agents
        ? this.props.agents.length !== 0
          ? this.props.agents.map((agent, i) => (
              <li className="list-group-item" key={i}>
                {agent.username} - {agent.email}{" "}
                {agent.agentConfirmedByManager ? (
                  <Fragment>
                    <span className="text-success">Confirmed</span>
                    <button
                      type="button"
                      className="ml-3 btn btn-sm btn-warning"
                      onClick={() =>
                        this.props.toggleAccount(agent.id, "DISABLE")
                      }
                    >
                      Disable
                    </button>
                  </Fragment>
                ) : (
                  <Fragment>
                    <span className="text-danger">Not Confirmed</span>
                    <button
                      type="button"
                      className="ml-3 btn btn-sm btn-success"
                      onClick={() =>
                        this.props.toggleAccount(agent.id, "ENABLE")
                      }
                    >
                      Enable Profile
                    </button>
                  </Fragment>
                )}{" "}
              </li>
            ))
          : "Sorry, you have no agents yet."
        : "Something went wrong";
      return (
        <div className="card">
          <div className="card-body">
            <ul className="list-group">
              <li className="list-group-item active">
                List of your company agents
              </li>
              <li className="list-group-item disabled">
                If status of Agent's account is{" "}
                <span className="text-danger">Not Confirmed</span>, Agent can
                not Login.
              </li>

              <div>{managersList}</div>
            </ul>
          </div>
        </div>
      );
    } else {
      return <h4>Loading...</h4>;
    }
  }
}
