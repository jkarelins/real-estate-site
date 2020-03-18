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
          <h4>Main page is here</h4>
          {this.props.allAdverts.map((advert, i) => (
            <div>
              <p key={i}>
                <Link to={`/advert/${advert.id}`}>
                  {advert.description} -> {advert.postcode}
                </Link>
              </p>
            </div>
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
