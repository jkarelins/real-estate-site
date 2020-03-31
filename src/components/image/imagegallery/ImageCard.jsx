import React, { Component } from "react";

export default class ImageCard extends Component {
  render() {
    if (this.props.removeAction) {
      return (
        <div className="card col-4">
          <img
            src={this.props.imageCon.image.url}
            className={`card-img-top img-fluid m-auto ${
              this.props.imageId === this.props.imageCon.image.id
                ? "toRemove"
                : ""
            }`}
            onClick={() =>
              this.props.removeAction(
                this.props.imageCon.image.public_id,
                this.props.imageCon.image.id
              )
            }
            alt={`${this.props.advert.address}, property ${
              this.props.advert.isForSale ? "for sale - " : "for rent - "
            }${this.props.advert.price}${
              this.props.advert.isForSale ? "EUR" : "EUR/month"
            }`}
          />
        </div>
      );
    } else {
      return (
        <div className="card col-4">
          <img
            src={this.props.imageCon.image.url}
            className="card-img-top img-fluid m-auto"
            alt={`${this.props.advert.address}, property ${
              this.props.advert.isForSale ? "for sale - " : "for rent - "
            }${this.props.advert.price}${
              this.props.advert.isForSale ? "EUR" : "EUR/month"
            }`}
          />
        </div>
      );
    }
  }
}
