import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAdvertsBySearchTerm } from "../../actions/advert";
import AdvertCard from "../advertcard/AdvertCard";

class MainPage extends Component {
  componentDidMount() {
    // console.log(this.props);
    switch (this.props.match.params.keyword) {
      case "city":
        this.props.fetchAdvertsBySearchTerm(
          0,
          this.props.match.params.keyword,
          this.props.match.params.value
        );
        break;
      default:
        break;
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
            if (advert.advert_images && advert.advert_images.length !== 0) {
              advert.image = advert.advert_images[0].image.url;
            }
            return <AdvertCard advert={advert} key={i} />;
          })}
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    allAdverts: state.advertReducer.searchedAdverts
  };
}

export default connect(mapStateToProps, { fetchAdvertsBySearchTerm })(MainPage);
