import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAdvert } from "../../actions/advert";

class SelectedAdvert extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchAdvert(id);
  }
  render() {
    if (!this.props.advert) {
      return <h1>Sorry this advert is not found</h1>;
    } else {
      return (
        <div>
          <h1>{this.props.advert.postcode}</h1>
          <p>{this.props.advert.description}</p>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    advert: state.advertReducer.selectedAdvert
  };
}

export default connect(mapStateToProps, { fetchAdvert })(SelectedAdvert);
