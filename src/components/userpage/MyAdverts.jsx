import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getMyAdverts } from "../../actions/advert";
import AdvertCard from "../advertcard/AdvertCard";

class FavoriteAdverts extends Component {
  componentDidMount() {
    if (this.props.user) {
      this.props.getMyAdverts();
    }
  }

  render() {
    if (!this.props.user) {
      return (
        <div className="row mt-3 text-center">
          <div className="col-12">
            <h4>Now you can Login to access your account.</h4>
          </div>
          <div className="col-12">
            <Link className="btn btn-outline-success" to="/login">
              Login
            </Link>
            <Link className="btn btn-outline-info ml-1" to="/register">
              Sign Up
            </Link>
          </div>
        </div>
      );
    } else if (
      !this.props.user.user.agentConfirmedByManager &&
      this.props.user.user.role === "agencyAgent"
    ) {
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
      if (!this.props.userAdverts) {
        return <h4>Loading...</h4>;
      } else {
        if (this.props.userAdverts.length === 0) {
          return (
            <div className="container text-center mt-3">
              <h4>You have not added advertisements yet</h4>
              <Link to="/user">Add Adevertisements</Link>
            </div>
          );
        } else {
          return (
            <div className="container">
              <div className="row mt-3 d-flex justify-content-center">
                {this.props.userAdverts.map((advert, i) => {
                  if (advert.advert_images && advert.advert_images.length !== 0) {
                    advert.image = advert.advert_images[0].image.url;
                  }
                  return <AdvertCard key={i} advert={advert} />;
                })}
              </div>
            </div>
          );
        }
      }
    }
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer,
    userAdverts: state.advertReducer.myAdverts
  };
}

export default connect(mapStateToProps, { getMyAdverts })(FavoriteAdverts);
