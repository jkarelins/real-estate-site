import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getFavorites } from "../../actions/likes";

class FavoriteAdverts extends Component {
  componentDidMount() {
    if (this.props.user) {
      this.props.getFavorites();
    }
  }

  render() {
    if (!this.props.user) {
      return <h4>Please Login first.</h4>;
    } else {
      if (!this.props.favorites) {
        return <h4>Loading...</h4>;
      } else {
        if (this.props.favorites.length === 0) {
          return (
            <div>
              <h4>You have not added favorite advertisements yet</h4>
            </div>
          );
        } else {
          return (
            <div>
              <ul>
                {this.props.favorites.map((likedAdvert, i) => (
                  <li key={i}>
                    <Link to={`/advert/${likedAdvert.advertId}`}>
                      {likedAdvert.advert.postcode}
                    </Link>
                  </li>
                ))}
              </ul>
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
