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
      return <h4>Please Login first.</h4>;
    } else {
      if (!this.props.userAdverts) {
        return <h4>Loading...</h4>;
      } else {
        if (this.props.userAdverts.length === 0) {
          return (
            <div className="container mt-3">
              <h4>You have not added advertisements yet</h4>
              <Link to="/user">Add Adevertisements</Link>
            </div>
          );
        } else {
          return (
            <div className="row mt-3 d-flex justify-content-center">
              {this.props.userAdverts.map((advert, i) => {
                if (advert.advert_images && advert.advert_images.length !== 0) {
                  advert.image = advert.advert_images[0].image.url;
                }
                return <AdvertCard key={i} advert={advert} />;
              })}
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
