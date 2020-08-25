import React, { Component, Fragment } from "react";

export default class AdvertForm extends Component {
  render() {
    return (
      <Fragment>
        <form onSubmit={this.props.submitNewAdvert}>
          <div className="row pl-3">
            {this.props.formValues.isForSale ? (
              <button
                className="btn btn-sm btn-success mr-3"
                type="button"
                onClick={() => this.props.forRentForSale("sale")}
              >
                For Sale
              </button>
            ) : (
              <button
                className="btn btn-sm btn-warning mr-3"
                type="button"
                onClick={() => this.props.forRentForSale("sale")}
              >
                For Sale
              </button>
            )}
            {this.props.formValues.isForRent ? (
              <button
                type="button"
                className="btn btn-sm btn-success"
                onClick={() => this.props.forRentForSale("rent")}
              >
                For Rent
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-sm btn-warning"
                onClick={() => this.props.forRentForSale("rent")}
              >
                For Rent
              </button>
            )}
          </div>
          {!this.props.formValues.isForRent && !this.props.formValues.isForSale ? (
            <div className="row pl-3 mb-3">
              <small className="text-danger">Please, Select is it For Sale or For Rent</small>
            </div>
          ) : (
            ""
          )}
          <div className="row mb-3 mt-3">
            <label htmlFor="price" className="col-12 col-md-6">
              Price - {this.props.formValues.isForSale
                ? "EUR"
                : this.props.formValues.isForRent
                ? "EUR/month"
                : ""} <span className="text-danger">*</span>
              <input
                type="number"
                name="price"
                className="form-control"
                min="1"
                step="1"
                value={this.props.formValues.price}
                onChange={this.props.handleChange}
                required
              />
              
            </label>
            <label htmlFor="postcode" className="col-12 col-md-6">
              City Name <span className="text-danger">*</span>
              <input
                type="text"
                name="city"
                className="form-control"
                value={this.props.formValues.city}
                onChange={this.props.handleChange}
                placeholder="City Name"
                required
              />
            </label>
          </div>
          <div className="row mb-3">
            <label htmlFor="postcode" className="col-12 col-md-8">
              Address <span className="text-danger">*</span>
              <input
                type="text"
                name="address"
                className="form-control"
                value={this.props.formValues.address}
                onChange={this.props.handleChange}
                placeholder="Address"
                required
              />
            </label>
            <label htmlFor="postcode" className="col-12 col-md-4">
              Postcode <span className="text-danger">*</span>
              <input
                type="text"
                name="postcode"
                className="form-control"
                value={this.props.formValues.postcode}
                onChange={this.props.handleChange}
                placeholder="Postcode"
                required
              />
            </label>
          </div>
          <div className="row mb-3">
            <label htmlFor="cionstructionYear" className="col-6">
              Construction Year <span className="text-danger">*</span>
              <input
                type="number"
                className="form-control"
                name="constructionYear"
                min="0"
                step="1"
                value={this.props.formValues.constructionYear}
                onChange={this.props.handleChange}
              />
            </label>
            <label htmlFor="renovationYear" className="col-6">
              Renovation Year <span className="text-danger">*</span>
              <input
                type="number"
                className="form-control"
                name="renovationYear"
                min="0"
                step="1"
                value={this.props.formValues.renovationYear}
                onChange={this.props.handleChange}
              />
            </label>
          </div>
          <div className="row mb-3">
            <label htmlFor="sqrMeter" className="col-6 col-md-3">
              Square Meter <span className="text-danger">*</span>
              <input
                type="number"
                className="form-control"
                name="sqrMeter"
                min="1"
                step="1"
                value={this.props.formValues.sqrMeter}
                onChange={this.props.handleChange}
                required
              />
            </label>
            <label htmlFor="cubicMeter" className="col-6 col-md-3">
              Cubic Meter <span className="text-danger">*</span>
              <input
                type="number"
                className="form-control"
                name="cubicMeter"
                min="1"
                step="1"
                value={this.props.formValues.cubicMeter}
                onChange={this.props.handleChange}
              />
            </label>
            <label htmlFor="numberOfRooms" className="col-6 col-md-3">
              Nr. of Rooms <span className="text-danger">*</span>
              <input
                type="number"
                className="form-control"
                name="nrOfRooms"
                min="1"
                step="1"
                value={this.props.formValues.nrOfRooms}
                onChange={this.props.handleChange}
              />
            </label>
            <label htmlFor="numberOfBathrooms" className="col-6 col-md-3">
              Nr. of Bathrooms <span className="text-danger">*</span>
              <input
                type="number"
                className="form-control"
                name="nrOfBathrooms"
                min="1"
                step="1"
                value={this.props.formValues.nrOfBathrooms}
                onChange={this.props.handleChange}
              />
            </label>
          </div>
          <div className="row mb-3">
            <label htmlFor="numberOfFloors" className="col-6 col-md-3">
              Number of Floors <span className="text-danger">*</span>
              <input
                type="number"
                className="form-control"
                name="nrOfFloors"
                min="1"
                step="1"
                value={this.props.formValues.nrOfFloors}
                onChange={this.props.handleChange}
              />
            </label>
            <label htmlFor="locatedOnFloor" className="col-6 col-md-3">
              Located on Floor <span className="text-danger">*</span>
              <input
                type="number"
                className="form-control"
                name="locatedOnFloor"
                min="0"
                step="1"
                value={this.props.formValues.locatedOnFloor}
                onChange={this.props.handleChange}
              />
            </label>
            <label htmlFor="monthlyPayment" className="col-6 col-md-3">
              Monthly Payments <span className="text-danger">*</span>
              <input
                type="number"
                className="form-control"
                name="monthlyContribution"
                min="0"
                step="1"
                value={this.props.formValues.monthlyContribution}
                onChange={this.props.handleChange}
              />
            </label>
            <label htmlFor="energyLabel" className="col-6 col-md-3">
              Energy Label
              <input
                type="text"
                className="form-control"
                name="energyLabel"
                maxLength="1"
                value={this.props.formValues.energyLabel}
                onChange={this.props.handleChange}
                required
              />
            </label>
          </div>
          <div className="row mt-3">
            <label htmlFor="heating" className="col-12 col-md-6">
              Heating
              <input
                type="text"
                className="form-control"
                name="heating"
                value={this.props.formValues.heating}
                onChange={this.props.handleChange}
              />
            </label>
            <label htmlFor="warmWater" className="col-12 col-md-6">
              Warm Water
              <input
                type="text"
                className="form-control"
                name="warmWater"
                value={this.props.formValues.warmWater}
                onChange={this.props.handleChange}
              />
            </label>
          </div>
          <div className="row mt-3">
            <label htmlFor="storage" className="col-12 col-md-6">
              Storage
              <input
                type="text"
                className="form-control"
                name="storage"
                value={this.props.formValues.storage}
                onChange={this.props.handleChange}
              />
            </label>

            <label htmlFor="parking" className="col-12 col-md-6">
              Parking
              <input
                type="text"
                className="form-control"
                name="parking"
                value={this.props.formValues.parking}
                onChange={this.props.handleChange}
              />
            </label>
          </div>
          <div className="col-12">
            <div className="row mt-3">
              <label htmlFor="description">
                Description <span className="text-danger">*</span>
              </label>
              <textarea
                className="form-control"
                id="description"
                rows="7"
                name="description"
                value={this.props.formValues.description}
                onChange={this.props.handleChange}
                placeholder="Description"
                required
              />
            </div>
          </div>
          <div className="col-12 mt-3">
            <input className="btn btn-success" type="submit" value="Add New" />
          </div>
        </form>
      </Fragment>
    );
  }
}
