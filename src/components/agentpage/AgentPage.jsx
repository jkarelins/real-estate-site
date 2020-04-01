import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Moment from "react-moment";

import AddNewAdvert from "../addnewadvert/AddNewAdvert";

class AgentPage extends Component {
  render() {
    if (this.props.user) {
      if (!this.props.user.agentConfirmedByManager) {
        return (
          <div className="container">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">
                  Sorry. Your account is suspended or not confirmed by your
                  manager.
                </h5>
              </div>
            </div>
          </div>
        );
      } else {
        const favoriteAdverts = this.props.user.advert_user_likes.length;
        return (
          <div className="row mt-3">
            <div className="col-12 col-sm-12 col-md-12 col-xl-3">
              <div className="card">
                <div className="card-body">
                  <h4>Welcome</h4>
                  <h5 className="card-title">{this.props.user.username}, </h5>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      You are manager of: {this.props.user.agency.name}{" "}
                    </li>
                    {+this.props.user.freeAdvertLimit ? (
                      <li className="list-group-item">
                        You can publish{" "}
                        <span className="font-weight-bold">
                          {this.props.user.freeAdvertLimit}
                        </span>{" "}
                        free advertisements
                      </li>
                    ) : (
                      ""
                    )}

                    {+this.props.user.agency.advertBalance ? (
                      <li className="list-group-item">
                        Your company balance:{" "}
                        <span className="font-weight-bold">
                          {this.props.user.agency.advertBalance}
                        </span>{" "}
                        paid advertisements
                      </li>
                    ) : (
                      ""
                    )}
                    <li className="list-group-item">
                      Registered:{" "}
                      <Moment fromNow ago>
                        {this.props.user.createdAt}
                      </Moment>
                    </li>
                    <li className="list-group-item">
                      Email: {this.props.user.email}
                    </li>
                    {+this.props.user.phoneNumber ? (
                      <li className="list-group-item">
                        Phone: {this.props.user.phoneNumber}
                      </li>
                    ) : (
                      <li className="list-group-item">
                        You have not published your phone number.
                      </li>
                    )}
                    <li className="list-group-item">
                      <Link to="/favorites">
                        You have{" "}
                        <span className="font-weight-bold">
                          {favoriteAdverts}
                        </span>{" "}
                        favorite adverts
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-xl-9">
              <AddNewAdvert />
              <hr className="my-3" />
            </div>
          </div>
        );
      }
    }
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer.user
  };
}

export default connect(mapStateToProps)(AgentPage);
