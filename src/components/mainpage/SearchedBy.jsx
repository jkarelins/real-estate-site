import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  fetchAdvertsBySearchTerm,
  clearSearchedAdverts,
} from "../../actions/advert";

import AdvertCard from "../advertcard/AdvertCard";

import {Helmet} from "react-helmet";
import SearchBarSearchPage from "../searchbar/SearchBarSearchPage";


const initialState = {
  offset: 0,
  limit: 12,
  search: {}
};
class MainPage extends Component {
  state = initialState;

  componentDidMount() {
    // console.log(this.props);
    switch (this.props.match.params.keyword) {
      case "city":
        const { keyword, value } = this.props.match.params;
        // console.log(keyword, value, this.props.location.state)
        if (this.props.allAdverts) {
          if (this.props.allAdverts.length !== 0) {
            this.setState({
              ...this.state,
              offset: this.props.allAdverts.length
            });
          } else {
            this.setState(initialState);
            this.props.fetchAdvertsBySearchTerm(
              this.state.offset,
              keyword,
              value,
              this.props.location.state
            );
            this.setState({ offset: this.state.offset + this.state.limit });
          }
        } else {
          this.props.fetchAdvertsBySearchTerm(
            0,
            keyword,
            value,
            this.props.location.state
          );
          this.setState({ offset: this.state.offset + this.state.limit });
        }
        break;
      default:
        break;
    }
  }

  findMore = (search) => {
    this.setState({...this.state, search});
    // console.log(search);
    const {priceFrom, priceTo, forRent, forSale} = search;
    const city = search.city || 'any';

    this.props.clearSearchedAdverts();
    this.props.fetchAdvertsBySearchTerm(
      0,
      'city',
      city,
      {priceFrom, priceTo, forRent, forSale}
    );
    console.log(this.state.offset, this.props.advertsCount)
    this.setState({ offset: this.state.offset + this.state.limit });
  }

  loadMore = () => {
    if(Object.keys(this.state.search).length === 0){
      const { keyword, value } = this.props.match.params;
      this.props.fetchAdvertsBySearchTerm(
        this.state.offset,
        keyword,
        value,
        this.props.location.state
      );
      this.setState({ offset: this.state.offset + this.state.limit });
    } else {
      const {priceFrom, priceTo, forRent, forSale} = this.state.search;
      const city = this.state.search.city || 'any';
      this.props.fetchAdvertsBySearchTerm(
        this.state.offset,
        'city',
        city,
        {priceFrom, priceTo, forRent, forSale}
      );
      this.setState({ offset: this.state.offset + this.state.limit });
    }
    console.log(this.state.offset, this.props.advertsCount)
    
  };

  numberWithSpaces = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  componentWillUnmount() {
    this.props.clearSearchedAdverts();
  }

  render() {
    // console.log(this.state);
    console.log();

    if (!this.props.allAdverts) {
      return (
        <div className="container">
          <h4>Main page is here. Sorry no advertisements yet!</h4>
        </div>
      );
    } else {
      const forRent = this.props.allAdverts.find(advert => advert.isForRent);
      const forSale = this.props.allAdverts.find(advert => advert.isForSale);
      return (
        <Fragment>
          <Helmet>
            <title>
              {this.props.allAdverts.length>0? (
                `${this.props.allAdverts[0].city} ${forRent?" for rent ":""} ${forSale?" for sale ":""}`
              ):(
                ""
              )}
            </title>
            {/* <link rel="canonical" href="http://mysite.com/example" /> */}
            {this.props.allAdverts.length>0? (
                <meta name="description" content={`Cheapest and fastest way to sell, buy and rent real 
                estate in ${this.props.allAdverts[0].city} in the Netherlands.`} />
              ):(
                ""
              )}
            <meta name="keywords" content="real estate, appartment, house, flat, rent, buy" />
          </Helmet>
          <SearchBarSearchPage findMore={this.findMore} />
          <div className="container">
            <div className="row mt-3 d-flex justify-content-center">
              {this.props.allAdverts.map((advert, i) => {
                if (advert.advert_images && advert.advert_images.length !== 0) {
                  advert.image = advert.advert_images[0].image.url;
                }
                return <AdvertCard advert={advert} key={i} />;
              })}
            </div>
            <div className="col-12 mt-3 mb-5 text-center">
              {this.props.advertsCount <= this.state.offset ? (
                <p className="text-danger">Sorry, no more advertisements</p>
              ) : (
                <button className="btn btn-primary" onClick={this.loadMore} style={{overflowAnchor: 'none'}}>
                  Load More
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
    allAdverts: state.advertReducer.searchedAdverts,
    advertsCount: state.advertReducer.advertsCount
  };
}

export default connect(mapStateToProps, {
  fetchAdvertsBySearchTerm,
  clearSearchedAdverts
})(MainPage);
