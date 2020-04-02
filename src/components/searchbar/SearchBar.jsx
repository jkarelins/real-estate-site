import React, { Component } from "react";

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

export default class SearchBar extends Component {
  state = initialState;

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  searchByCityname = e => {
    e.preventDefault();
    if (this.state.priceFrom > this.state.priceTo) {
      this.setState({
        ...this.state,
        minMoreThenMax: true
      });
      return;
    }
    if (!this.state.forRent && !this.state.forSale) {
      this.setState({
        ...this.state,
        noRentNoSale: true
      });
      return;
    }
    if (this.state.city === "") {
      this.props.history.push({
        pathname: `/search/city/any`,
        state: this.state
      });
      return;
    }
    this.props.history.push({
      pathname: `/search/city/${this.state.city}`,
      state: this.state
    });
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
      <div className="container mt-3">
        <div className="card">
          <div className="card-body">
            <form
              // className="form-inline"
              onSubmit={e => this.searchByCityname(e)}
            >
              <div className="row">
                <div className="col-3">
                  <input
                    className="form-control"
                    type="search"
                    placeholder="Input City Name"
                    aria-label="Search"
                    name="city"
                    onChange={this.handleChange}
                    value={this.state.city}
                  />
                </div>
                <div className="col-2">
                  <input
                    className="form-control"
                    type="number"
                    placeholder="Price From"
                    aria-label="Search"
                    name="priceFrom"
                    onChange={this.handleChange}
                    value={this.state.priceFrom}
                    min="1"
                  />
                </div>
                <div className="col-2">
                  <input
                    className="form-control"
                    type="search"
                    placeholder="Price To"
                    aria-label="Search"
                    name="priceTo"
                    onChange={this.handleChange}
                    value={this.state.priceTo}
                    min="0"
                  />
                </div>
                <div className="col-3 my-auto">
                  <button
                    type="button"
                    className={`btn btn-sm ${
                      this.state.forRent ? "btn-success" : "btn-outline-warning"
                    }`}
                    onClick={() => this.forSaleOrRent("RENT")}
                  >
                    For Rent
                  </button>
                  <button
                    type="button"
                    className={`btn btn-sm ml-2 ${
                      this.state.forSale ? "btn-success" : "btn-outline-warning"
                    }`}
                    onClick={() => this.forSaleOrRent("SALE")}
                  >
                    For Sale
                  </button>
                </div>
                <div className="col-2 my-auto">
                  <input
                    type="submit"
                    value="Search"
                    className="btn btn-outline-success"
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
        </div>
      </div>
    );
  }
}
