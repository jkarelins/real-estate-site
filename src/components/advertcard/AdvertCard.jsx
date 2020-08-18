import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class AdvertCard extends Component {
  numberWithSpaces = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  render() {
    const { advert } = this.props;
    const advertImage =
      advert.image ||
      "https://res.cloudinary.com/dpjzmbojz/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1597782723/No_image_3x4.svg_dqj5vw.png";

    return (
      <div className="col-12 col-md-6 col-lg-4 mt-3">
        <div className="card h-100">
          <img
            className="card-img-top"
            style={{ maxHeight: "30vh", objectFit: "cover" }}
            src={advertImage}
            alt={`${advert.isForRent ? "For rent:" : "For Sale:"} ${
              advert.address
            }, ${advert.city}, ${advert.postcode}`}
          />
          <div className="card-body d-flex flex-column">
            <h5 className="card-title mt-auto">
              {advert.address}, {advert.city}
            </h5>
            <h6 className="card-subtitle mb-2 text-muted">{advert.postcode}</h6>
            <p className="card-text">
              {this.numberWithSpaces(advert.price)}{" "}
              {advert.isForRent ? "EUR/month" : "EUR"}
            </p>
            <Link to={`/advert/${advert.id}`} className="btn btn-info">
              READ MORE
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
