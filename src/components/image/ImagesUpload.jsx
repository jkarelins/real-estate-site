import React, { Component, Fragment } from "react";
import { uploadImage } from "../../actions/images";
import { connect } from "react-redux";

const initialState = {
  selectedFile: null,
  localUrl: null,
  error: "",
  pleaseWait: "",
  progress: 0
};

class ImagesUpload extends Component {
  state = initialState;

  timeOut = async t => {
    return new Promise((resolve, reject) => {
      this.timerHandle = setTimeout(() => {
        resolve(`Completed in ${t}`);
      }, t);
    });
  };

  handleImage = e => {
    if (!e.target.files[0]) return;
    this.setState({
      selectedFile: e.target.files[0],
      error: "",
      localUrl: URL.createObjectURL(e.target.files[0])
    });
  };

  uploadImage = async () => {
    if (!this.state.selectedFile) {
      this.setState({
        error: "Please select image to upload first"
      });
      return;
    }
    let fd = new FormData();
    fd.append("image", this.state.selectedFile, this.state.selectedFile.name);
    this.props.uploadImage(fd);
    this.setState({
      pleaseWait: "Please wait loading an Image"
    });

    setTimeout(this.loadingProgress, 400);

    await this.timeOut(5000).then(() => {
      this.setState(initialState);
    });
  };

  loadingProgress = async () => {
    if (this.state.progress >= 1000) {
      return;
    }
    this.setState({ progress: this.state.progress + 100 });
    setTimeout(this.loadingProgress, 400);
  };

  componentWillUnmount = () => {
    if (this.timerHandle) {
      clearTimeout(this.timerHandle);
      this.timerHandle = 0;
    }
  };

  render() {
    return (
      <Fragment>
        <div>
          {this.state.error ? (
            <div className="alert alert-danger my-3" role="alert">
              {this.state.error}
            </div>
          ) : (
            ""
          )}

          <div className="card mt-3">
            {this.state.localUrl ? (
              <Fragment>
                {this.state.pleaseWait ? (
                  <Fragment>
                    <div className="alert alert-success" role="alert">
                      {this.state.pleaseWait}
                    </div>
                    <div className="progress my-2">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: this.state.progress }}
                        aria-valuenow={this.state.progress}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        {Math.round(this.state.progress / 10)}%
                      </div>
                    </div>
                  </Fragment>
                ) : (
                  ""
                )}
                <img
                  style={{ maxHeight: "300px", objectFit: "cover" }}
                  className="card-img-top "
                  src={this.state.localUrl}
                  alt="Your selected upload"
                />
                <hr />
                <button
                  type="button"
                  onClick={this.uploadImage}
                  className="btn btn-primary"
                >
                  Upload
                </button>
              </Fragment>
            ) : (
              ""
            )}
            <div className="card-body">
              <h5 className="card-title">Upload Image</h5>
              <p className="card-text">
                Please select image you want to upload. Check it on preview, and
                press Upload.
              </p>

              <div className="input-group mb-3">
                <div className="input-group-prepend"></div>
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    onChange={this.handleImage}
                  />
                  <label className="custom-file-label">Choose file</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    images: state.imageReducer.addedImages
  };
}

export default connect(mapStateToProps, { uploadImage })(ImagesUpload);
