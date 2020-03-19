import React, { Component } from "react";

export default class TopUpAgencyBalance extends Component {
  render() {
    return (
      <div>
        <h4>Here you can add extra agency credits</h4>
        <form onSubmit={e => this.props.addAdverts(e)}>
          <label htmlFor="addAdverts">
            Buy more advertisements for agency
            <input
              type="number"
              min="1"
              max="20"
              name="addExtra"
              value={this.props.addExtra}
              onChange={this.props.handleChange}
            />
          </label>
          <input type="submit" value="Add" />
        </form>
      </div>
    );
  }
}
