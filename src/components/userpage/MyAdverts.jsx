import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getMyAdverts } from "../../actions/advert";

class FavoriteAdverts extends Component {
  componentDidMount() {
    if (this.props.user) {
      this.props.getMyAdverts();
    }
  }

  render() {
    if (!this.props.user) {
      return <h4>Please Login first.</h4>;
    } else {
      if (!this.props.userAdverts) {
        return <h4>Loading...</h4>;
      } else {
        if (this.props.userAdverts.length === 0) {
          return (
            <div>
              <h4>You have not added advertisements yet</h4>
              <Link to="/user">Add Adevertisements</Link>
            </div>
          );
        } else {
          return (
            <div>
              <ul>
                {this.props.userAdverts.map((advert, i) => (
                  <li key={i}>
                    <Link to={`/advert/${advert.id}`}>{advert.postcode}</Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        }
      }
    }
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer,
    userAdverts: state.advertReducer.myAdverts
  };
}

export default connect(mapStateToProps, { getMyAdverts })(FavoriteAdverts);
