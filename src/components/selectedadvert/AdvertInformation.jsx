import React, { Component, Fragment } from "react";
import Moment from "react-moment";

export default class AdvertInformation extends Component {
  numberWithSpaces = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };
  render() {
    const { advert } = this.props;

    return (
      <Fragment>
        <ul className="list-group">
          <li className="list-group-item active">Main</li>
          <li className="list-group-item">
            Price: {this.numberWithSpaces(advert.price)}{" "}
            {advert.isForSale ? "EUR" : "EUR/month"}
          </li>
          <li className="list-group-item">
            Price per m<sup>2</sup>: ~
            {Math.round(advert.price / advert.sqrMeter)} EUR
          </li>
          {advert.monthlyContibution ? (
            <li className="list-group-item">
              Monthly Payments: {advert.monthlyContibution} EUR
            </li>
          ) : (
            ""
          )}

          <li className="list-group-item">
            Advertisement published: <Moment fromNow>{advert.createdAt}</Moment>
          </li>
          <li className="list-group-item">Status: {advert.advertStatus}</li>
        </ul>

        <ul className="list-group mt-3">
          <li className="list-group-item active">Building Information</li>
          <li className="list-group-item">
            Construction Year: {advert.constructionYear}
          </li>
          <li className="list-group-item">
            Last Renovation Year: {advert.renovationYear}
          </li>
        </ul>

        <ul className="list-group mt-3">
          <li className="list-group-item active">Real Estate Dimensions</li>
          <li className="list-group-item">
            Living Space: {advert.sqrMeter} m<sup>2</sup>
          </li>
          <li className="list-group-item">
            Living Volume: {advert.cubicMeter} m<sup>3</sup>
          </li>
        </ul>

        <ul className="list-group mt-3">
          <li className="list-group-item active">Real Estate Layout</li>
          <li className="list-group-item">
            Number of Rooms: {advert.nrOfRooms}
          </li>
          <li className="list-group-item">
            Number of Bathrooms: {advert.nrOfBathrooms}
          </li>
          <li className="list-group-item">
            Located on: {advert.locatedOnFloor} floor
          </li>
          <li className="list-group-item">
            Number of Floors: {advert.nrOfFloors}
          </li>
        </ul>

        <ul className="list-group mt-3">
          <li className="list-group-item active">Energy</li>
          <li className="list-group-item">
            Energy Label: {advert.energyLabel}
          </li>
          {advert.heating ? (
            <li className="list-group-item">Heating: {advert.heating}</li>
          ) : (
            ""
          )}
          {advert.warmWater ? (
            <li className="list-group-item">Warm Water: {advert.warmWater}</li>
          ) : (
            ""
          )}
        </ul>
        {advert.storage || advert.parking ? (
          <ul className="list-group mt-3">
            <li className="list-group-item active">Storage & Parking</li>
            {advert.storage ? (
              <li className="list-group-item">Storage: {advert.storage}</li>
            ) : (
              ""
            )}
            {advert.parking ? (
              <li className="list-group-item">Parking: {advert.parking}</li>
            ) : (
              ""
            )}
          </ul>
        ) : (
          ""
        )}
      </Fragment>
    );
  }
}
