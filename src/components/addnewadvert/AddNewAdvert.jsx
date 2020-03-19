import React, { Component } from "react";
import { connect } from "react-redux";
import { createAdvert } from "../../actions/advert";

const initialState = {
  description: "",
  postcode: ""
};

class AddNewAdvert extends Component {
  state = initialState;

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitNewAdvert = e => {
    e.preventDefault();
    this.props.createAdvert(this.state);
    this.setState(initialState);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.submitNewAdvert}>
          <input
            type="text"
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
            placeholder="Description"
            required
          />
          <input
            type="text"
            name="postcode"
            value={this.state.postcode}
            onChange={this.handleChange}
            placeholder="Postcode"
            required
          />
          <input type="submit" value="Add New" />
        </form>
      </div>
    );
  }
}

export default connect(null, { createAdvert })(AddNewAdvert);
