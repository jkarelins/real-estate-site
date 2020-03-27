import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAdverts } from "../../actions/advert";
import { Link } from "react-router-dom";

class MainPage extends Component {
  componentDidMount() {
    if (this.props.allAdverts.length === 0) {
      this.props.fetchAdverts(0);
    }
  }

  numberWithSpaces = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  render() {
    if (!this.props.allAdverts) {
      return (
        <div>
          <h4>Main page is here. Sorry no events yet!</h4>
        </div>
      );
    } else {
      return (
        <div className="row mt-3 d-flex justify-content-center">
          {this.props.allAdverts.map((advert, i) => {
            const advertImage =
              advert.image ||
              "https://res.cloudinary.com/dpjzmbojz/image/upload/v1585304394/No_image_3x4.svg_dqj5vw.png";

            return (
              <div className="col-12 col-md-6 col-lg-4 col-xl-3 mt-3" key={i}>
                <div className="card">
                  <img
                    className="card-img-top"
                    style={{ maxHeight: "30vh", objectFit: "cover" }}
                    src={advertImage}
                    alt={`${advert.isForRent ? "For rent:" : "For Sale:"} ${
                      advert.address
                    }, ${advert.city}, ${advert.postcode}`}
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      {advert.address}, {advert.city}
                    </h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {advert.postcode}
                    </h6>
                    <p className="card-text">
                      {this.numberWithSpaces(advert.price)}{" "}
                      {advert.isForRent ? "EUR/month" : "EUR"}
                    </p>
                    <Link to={`/advert/${advert.id}`} className="btn btn-info">
                      OPEN
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    allAdverts: state.advertReducer.allAdverts
  };
}

export default connect(mapStateToProps, { fetchAdverts })(MainPage);
