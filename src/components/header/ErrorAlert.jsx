import React, { Component } from "react";

export default class ErrorAlert extends Component {
  render() {
    return (
      <div>
        {this.props.error ? (
          this.props.error.actionErr ? (
            <div className="mt-2 d-flex justify-content-center">
              <div className="col-12 col-md-6">
                <div className="alert alert-warning" role="alert">
                  {this.props.error.actionErr}
                  <button
                    type="button"
                    className="close"
                    aria-label="Close"
                    onClick={this.props.clearErrors}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              </div>
            </div>
          ) : this.props.error.userErr ? (
            <div className="mt-2 d-flex justify-content-center">
              <div className="col-12 col-md-6">
                <div className="alert alert-danger" role="alert">
                  {this.props.error.userErr}
                  <button
                    type="button"
                    className="close"
                    aria-label="Close"
                    onClick={this.props.clearErrors}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-2 d-flex justify-content-center">
              <div className="col-12 col-md-6">
                <div className="alert alert-warning" role="alert">
                  Unexpected error. Please contact us: technical@support.com
                  <button
                    type="button"
                    className="close"
                    aria-label="Close"
                    onClick={this.props.clearErrors}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              </div>
            </div>
          )
        ) : (
          ""
        )}
      </div>
    );
  }
}
