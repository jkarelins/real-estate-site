import React, { Component, Fragment } from "react";
import Moment from "react-moment";

export default class UserCard extends Component {
  render() {
    if (this.props.user) {
      const { user } = this.props;
      return (
        <div className="card">
          {user.agency ? (
            <Fragment>
              <div className="card-header">
                {user.agency.name},{" "}
                <span className="font-italic">
                  Published By: {user.username}
                </span>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  Company Registered:{" "}
                  <Moment fromNow>{user.agency.createdAt}</Moment>
                </li>
                <li className="list-group-item">Email: {user.email}</li>
                {+user.phoneNumber ? (
                  <li className="list-group-item">Phone: {user.phoneNumber}</li>
                ) : (
                  ""
                )}
              </ul>
            </Fragment>
          ) : (
            <Fragment>
              <div className="card-header">
                {user.username}
                {user.isVerifiedByAdmin ? (
                  <span className="badge badge-pill badge-success ml-2">
                    Verified Account
                  </span>
                ) : (
                  <span className="badge badge-pill badge-warning ml-2">
                    Not Verified Account
                  </span>
                )}
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  User Registered: <Moment fromNow>{user.createdAt}</Moment>
                </li>
                <li className="list-group-item">
                  Email:{" "}
                  <a target="new" href={`mailto: ${user.email}`}>
                    Send Email
                  </a>
                </li>
                {+user.phoneNumber ? (
                  <li className="list-group-item">Phone: {user.phoneNumber}</li>
                ) : (
                  ""
                )}
              </ul>
            </Fragment>
          )}
        </div>
      );
    } else {
      return <h4>Loading User</h4>;
    }
  }
}
