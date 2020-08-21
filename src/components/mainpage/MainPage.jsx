import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { fetchAdverts } from "../../actions/advert";
import AdvertCard from "../advertcard/AdvertCard";
import SearchBar from "../searchbar/SearchBar";
import FirstMenu from "./FirstMenu";

import {Helmet} from "react-helmet";

import './mainpage.css'

const initialState = {
  offset: 0,
  limit: 12,
  noMoreAdverts: false
};
class MainPage extends Component {
  state = initialState;

  componentDidMount() {
    setTimeout(() => {
      if (this.props.allAdverts.length !== 0) {
        this.setState({
          ...this.state,
          offset: this.props.allAdverts.length,
          noMoreAdverts: true
        });
      } else {
        this.setState(initialState);
        this.props.fetchAdverts(this.state.offset);
        this.setState({
          offset: this.state.offset + this.state.limit,
          noMoreAdverts: true
        });
      }
    }, 500);
  }

  loadMore = () => {
    this.props.fetchAdverts(this.state.offset);
    this.setState({ offset: this.state.offset + this.state.limit });
  };

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
          <h4>Main page. Sorry no advertisements yet. Be first to add one.</h4>
        </div>
      );
    } else {
      return (
        <Fragment>
          <Helmet>
            <title>Real Estate The Netherlands</title>
            {/* <link rel="canonical" href="http://mysite.com/example" /> */}
            <meta name="description" content="Cheapest and fastest way to sell, buy and rent real estate in the Netherlands." />
            <meta name="keywords" content="real estate, appartment, house, flat, rent, buy" />
          </Helmet>
          <SearchBar />
          <hr className="hrSection" />
          <FirstMenu />
          <hr className="hrSection" />
          <div className="container">
            <div className="row mt-3 d-flex justify-content-center">
              {this.props.allAdverts.map((advert, i) => (
                <AdvertCard advert={advert} key={i} />
              ))}
            </div>
            <div className="d-flex justify-content-center mt-3 mb-5">
              {this.props.advertsCount <= this.state.offset ? (
                <p className="text-danger">
                  {this.state.noMoreAdverts
                    ? "Sorry, no more advertisements"
                    : "Loading..."}
                </p>
              ) : (
                <button className="btn btn-primary mt-3 px-5" onClick={this.loadMore} style={{overflowAnchor: 'none'}}>
                  LOAD MORE
                </button>
              )}
            </div>
          </div>
        </Fragment>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    allAdverts: state.advertReducer.allAdverts,
    advertsCount: state.advertReducer.advertsCount,
    user: state.userReducer
  };
}

export default connect(mapStateToProps, { fetchAdverts })(MainPage);
