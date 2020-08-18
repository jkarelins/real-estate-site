import React, { Component } from "react";

export default class SuccessAlert extends Component {
  render() {
    return (
      <div>
        {this.props.success ? (
          <div className="mt-2 d-flex justify-content-center">
            <div className="col-12 col-md-6">
              <div className="alert alert-success" role="alert">
                {this.props.success.text}
                <button
                  type="button"
                  className="close"
                  aria-label="Close"
                  onClick={this.props.clearSuccess}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
