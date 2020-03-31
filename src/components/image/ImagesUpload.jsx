import React, { Component, Fragment } from "react";
import { uploadImage } from "../../actions/images";
import { connect } from "react-redux";

const initialState = {
  selectedFile: null
};

class ImagesUpload extends Component {
  state = initialState;

  handleImage = e => {
    this.setState({ selectedFile: e.target.files[0] });
  };

  uploadImage = () => {
    if (!this.state.selectedFile) return;
    let fd = new FormData();
    fd.append("image", this.state.selectedFile, this.state.selectedFile.name);
    this.props.uploadImage(fd);
    this.setState(initialState);
  };

  render() {
    return (
      <Fragment>
        <div>
          <h4>Upload image</h4>
          <input type="file" onChange={this.handleImage} />
          <button type="button" onClick={this.uploadImage}>
            Upload
          </button>
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
