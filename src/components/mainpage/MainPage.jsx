import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAdverts } from "../../actions/advert";
import AdvertCard from "../advertcard/AdvertCard";

class MainPage extends Component {
  componentDidMount() {
    if (this.props.allAdverts.length === 0) {
      this.props.fetchAdverts(0);
    }
  }

  // IF USER PUSH LOGOUT, CLEAR STATE OF ADVERT IN REDUCER, AND FETCH ONE MORE TIME
  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      this.props.fetchAdverts(0);
    }
  }

  render() {
    if (!this.props.allAdverts) {
      return (
        <div>
          <h4>Main page is here. Sorry no events yet!</h4>
        </div>
      );
    } else {
      return (
        <div className="row mt-3 d-flex justify-content-center">
          {this.props.allAdverts.map((advert, i) => (
            <AdvertCard advert={advert} key={i} />
          ))}
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    allAdverts: state.advertReducer.allAdverts,
    user: state.userReducer
  };
}

export default connect(mapStateToProps, { fetchAdverts })(MainPage);
