import React, { Component } from "react";
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
        <div className="contaner mt-3">
          <h4>Please Login first.</h4>
        </div>
      );
    } else {
      if (!this.props.favorites) {
        return <h4>Loading...</h4>;
      } else {
        if (this.props.favorites.length === 0) {
          return (
            <div className="contaner mt-3">
              <h4>You have not added favorite advertisements yet</h4>
            </div>
          );
        } else {
          return (
            <div className="row mt-3 d-flex justify-content-center">
              {this.props.favorites.map((likedAdvert, i) => (
                <AdvertCard advert={likedAdvert.advert} key={i} />
              ))}
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
