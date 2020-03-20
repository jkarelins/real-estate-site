import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAdvert } from "../../actions/advert";
import { likeAdvert } from "../../actions/likes";

class SelectedAdvert extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchAdvert(id);
  }

  likeAdvert = () => {
    const { id } = this.props.match.params;
    this.props.likeAdvert(id);
  };

  render() {
    if (!this.props.advert) {
      return <h1>Sorry this advert is not found</h1>;
    } else {
      // const chekIfLiked = this.props.liked.find(
      //   advert => advert.advertId === this.props.advert.id
      // );
      // console.log(chekIfLiked);

      return (
        <div>
          <h1>{this.props.advert.postcode}</h1>
          <p>{this.props.advert.description}</p>
          {this.props.user ? (
            this.props.liked ? (
              ""
            ) : (
              <button onClick={this.likeAdvert}>Like</button>
            )
          ) : (
            ""
          )}
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  if (state.advertReducer.selectedAdvert && state.likeReducer.likedAdverts) {
    return {
      user: state.userReducer,
      advert: state.advertReducer.selectedAdvert,
      liked: state.likeReducer.likedAdverts.find(
        advert => advert.advertId === state.advertReducer.selectedAdvert.id
      )
    };
  }
  return {
    user: state.userReducer
  };
}

export default connect(mapStateToProps, { fetchAdvert, likeAdvert })(
  SelectedAdvert
);
