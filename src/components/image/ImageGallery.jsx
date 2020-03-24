import React, { Component } from "react";

export default class ImageGallery extends Component {
  render() {
    return (
      <div>
        <h4>Gallery</h4>
        {this.props.advert.advert_images.map((imageCon, i) => (
          <img
            key={i}
            src={imageCon.image.url}
            width="150"
            height="150"
            alt={`${this.props.advert.address}, property ${
              this.props.advert.isForSale ? "for sale - " : "for rent - "
            }${this.props.advert.price}${
              this.props.advert.isForSale ? "EUR" : "EUR/month"
            }`}
          />
        ))}
      </div>
    );
  }
}
