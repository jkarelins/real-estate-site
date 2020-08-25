import React, { Component } from "react";
import { connect } from "react-redux";
import { createAdvert } from "../../actions/advert";
import AdvertForm from "./AdvertForm";

import "./addnew.css";

const initialState = {
  description: "",
  isForSale: false,
  isForRent: false,
  price: 0,
  address: "",
  city: "",
  postcode: "",
  sqrMeter: 0,
  cubicMeter: 0,
  nrOfRooms: 0,
  nrOfBathrooms: 0,
  nrOfFloors: 0,
  locatedOnFloor: 0,
  advertStatus: "published",
  monthlyContribution: 0,
  constructionYear: 2010,
  renovationYear: 2010,
  energyLabel: "",
  heating: "",
  warmWater: "",
  storage: "",
  parking: "",
  showAddForm: false,
  error: ""
};

class AddNewAdvert extends Component {
  state = initialState;

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitNewAdvert = e => {
    e.preventDefault();
    if (!this.state.isForRent && !this.state.isForSale) {
      this.setState({
        error: "Please select is it For Sale or For Rent"
      });
      return;
    }
    this.props.createAdvert(this.state);
    this.setState(initialState);
  };

  forRentForSale = action => {
    if (action === "sale") {
      this.setState({
        ...this.state,
        isForSale: true,
        isForRent: false,
        error: ""
      });
    }
    if (action === "rent") {
      this.setState({
        ...this.state,
        isForSale: false,
        isForRent: true,
        error: ""
      });
    }
  };

  showAdvertForm = () => {
    this.setState({
      showAddForm: !this.state.showAddForm
    });
  };

  render() {
    return (
      <div className="card">
        <div className="">
          <h5 className="card-title greenUnderline m-3">Add New advertisement</h5>
          {this.state.showAddForm ? (
            <div className="col-12 my-3">
              <button
                className="btn btn-sm btn-warning my-3"
                type="button"
                onClick={this.showAdvertForm}
              >
                Hide Advert Form
              </button>
              <hr className="hrSection" />
              {this.state.error ? (
                <div className="alert alert-danger my-3 mx-5" role="alert">
                  {this.state.error}
                </div>
              ) : (
                ""
              )}
              <AdvertForm
                submitNewAdvert={this.submitNewAdvert}
                handleChange={this.handleChange}
                formValues={this.state}
                forRentForSale={this.forRentForSale}
              />
            </div>
          ) : (
            <div className="col-6 my-3">
              <button
                className="btn btn-sm btn-info"
                type="button"
                onClick={this.showAdvertForm}
              >
                Add New Advert
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default connect(null, { createAdvert })(AddNewAdvert);
