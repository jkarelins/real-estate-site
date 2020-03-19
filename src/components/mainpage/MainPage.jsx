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
  render() {
    if (!this.props.allAdverts) {
      return (
        <div>
          <h4>Main page is here. Sorry no events yet!</h4>
        </div>
      );
    } else {
      return (
        <div>
          {this.props.allAdverts.map((advert, i) => (
            <p key={i}>
              <Link to={`/advert/${advert.id}`}>
                {advert.description} -> {advert.postcode}
              </Link>
            </p>
          ))}
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
