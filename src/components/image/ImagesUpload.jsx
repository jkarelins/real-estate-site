import React, { Component, Fragment } from "react";
import { uploadImage } from "../../actions/images";
import { connect } from "react-redux";

const initialState = {
  selectedFile: null,
  localUrl: null,
  error: "",
  pleaseWait: ""
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

    await this.timeOut(5000).then(() => {
      this.setState(initialState);
    });
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
                <img
                  className="card-img-top"
                  src={this.state.localUrl}
                  alt="You are going to upload this image"
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
                Please select image you want upload. Check it on preview, and
                press Upload
              </p>

              <div className="input-group mb-3">
                <div className="input-group-prepend"></div>
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="inputGroupFile01"
                  />
                  <label
                    className="custom-file-label"
                    htmlFor="inputGroupFile01"
                  >
                    Choose file
                  </label>
                </div>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <input type="file" onChange={this.handleImage} />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <h4>Images</h4>
          {this.props.images.map((image, i) => (
            <img key={i} src={image.url} alt="" width="150" height="150" />
          ))}
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
