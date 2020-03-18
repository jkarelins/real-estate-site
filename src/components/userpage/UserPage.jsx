import React, { Component } from "react";
import { connect } from "react-redux";

class UserPage extends Component {
  render() {
    if (!this.props.user) {
      return (
        <div>
          <h4>Please Login or sign up first</h4>
        </div>
      );
    } else {
      return <div>User page is here</div>;
    }
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer
  };
}

export default connect(mapStateToProps)(UserPage);
