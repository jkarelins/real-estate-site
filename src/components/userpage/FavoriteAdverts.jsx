import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { getFavorites } from "../../actions/likes";
import AdvertCard from "../advertcard/AdvertCard";

class FavoriteAdverts extends Component {
  componentDidMount() {
    if (this.props.user) {
      this.props.getFavorites();
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
    } else {
      if (!this.props.favorites) {
        return <h4>Loading...</h4>;
      } else {
        if (this.props.favorites.length === 0) {
          return (
            <div className="container text-center mt-3">
              <h4>You have not added favorite advertisements yet</h4>
            </div>
          );
        } else {
          return (
            <div className="row mt-3 d-flex justify-content-center">
              {this.props.favorites.map((likedAdvert, i) => {
                if (
                  likedAdvert.advert.advert_images &&
                  likedAdvert.advert.advert_images.length !== 0
                ) {
                  likedAdvert.advert.image =
                    likedAdvert.advert.advert_images[0].image.url;
                }
                return <AdvertCard advert={likedAdvert.advert} key={i} />;
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
    favorites: state.likeReducer.userFavorites
  };
}

export default connect(mapStateToProps, { getFavorites })(FavoriteAdverts);
