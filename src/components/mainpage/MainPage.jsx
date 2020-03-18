import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchEvents } from "../../actions/advert";

class MainPage extends Component {
  componentDidMount() {
    if (this.props.allAdverts.length === 0) {
      this.props.fetchEvents(1);
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
                {advert.description} -> {advert.postcode}
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

export default connect(mapStateToProps, { fetchEvents })(MainPage);
