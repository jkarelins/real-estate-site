import React, { Component } from "react";
import { withRouter } from "react-router";

import "./SearchBar.css"

const initialState = {
  city: "",
  priceFrom: 1,
  priceTo: 10000000,
  forRent: true,
  forSale: true,
  noSearchTerm: false,
  minMoreThenMax: false,
  noRentNoSale: false
};

class SearchBar extends Component {
  state = initialState;

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  searchByCityname = e => {
    e.preventDefault(); 
    this.props.findMore(this.state);
  };

  forSaleOrRent = action => {
    switch (action) {
      case "RENT":
        this.setState({
          ...this.state,
          forRent: !this.state.forRent
        });
        break;
      case "SALE":
        this.setState({
          ...this.state,
          forSale: !this.state.forSale
        });
        break;
      default:
        break;
    }
  };

  componentWillUnmount() {
    this.setState(initialState);
  }

  render() {
    // console.log(this.props);
    return (
      <div className="mt-3">
        <div className="container">
          <form
              className="form-inline"
              onSubmit={e => this.searchByCityname(e)}
          >
          <div className="form-row">
            <div className="form-group col-12 col-md-3">
              <label htmlFor="cityName" className="col-12">City Name</label>
              <input
                className="form-control col-12"
                type="search"
                placeholder="Input City Name"
                aria-label="Search"
                name="city"
                onChange={this.handleChange}
                value={this.state.city}
              />
            </div>
            <div className="form-group col-6 col-md-2">
              <label htmlFor="priceFrom" className="col-12">Price From</label>
              <input
                className="form-control col-12"
                type="number"
                placeholder="Price From"
                aria-label="Search"
                name="priceFrom"
                onChange={this.handleChange}
                value={this.state.priceFrom}
                min="1"
              />
            </div>
            <div className="form-group col-6 col-md-2">
              <label htmlFor="priceTo" className="col-12">Price To</label>
              <input
                className="form-control col-12"
                type="number"
                placeholder="Price To"
                aria-label="Search"
                name="priceTo"
                onChange={this.handleChange}
                value={this.state.priceTo}
                min="10"
              />
            </div>
            <div className="d-flex align-items-end">
              <button
                type="button"
                className={`btn ml-2 ${
                  this.state.forRent ? "btn-success" : "btn-outline-warning"
                }`}
                onClick={() => this.forSaleOrRent("RENT")}
              >
                For Rent
              </button>
              <button
                type="button"
                className={`btn ml-2 ${
                  this.state.forSale ? "btn-success" : "btn-outline-warning"
                }`}
                onClick={() => this.forSaleOrRent("SALE")}
              >
                For Sale
              </button>

              <input
                type="submit"
                value="Search"
                className="btn btn-outline-primary ml-2"
              />
            </div>
          </div>
        </form>
        </div>
        <div className="col text-center mb-2">
          <small className="text-danger">
            {this.state.noSearchTerm ? "Please define some search term" : ""}
            {this.state.minMoreThenMax
              ? "Minimal price should be less then maximal"
              : ""}
            {this.state.noRentNoSale
              ? "For Rent or For Sale should be selected"
              : ""}
          </small>
        </div>
        <hr className="hrSection" />
      </div>
    );
  }
}

export default withRouter((SearchBar));