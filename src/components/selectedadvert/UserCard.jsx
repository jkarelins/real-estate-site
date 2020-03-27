import React, { Component, Fragment } from "react";

export default class UserCard extends Component {
  render() {
    if (this.props.user) {
      const { user } = this.props;
      console.log(user);
      return (
        <div className="card">
          {user.agency ? (
            <Fragment>
              <div className="card-header">{user.agency.name}</div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Email: {user.email}</li>
                <li className="list-group-item">Phone: {user.phoneNumber}</li>
                <li className="list-group-item">Vestibulum at eros</li>
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
                <li className="list-group-item">Email: {user.createdAt}</li>
                <li className="list-group-item">Email: {user.email}</li>
                <li className="list-group-item">Phone: {user.phoneNumber}</li>
                <li className="list-group-item">Vestibulum at eros</li>
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
