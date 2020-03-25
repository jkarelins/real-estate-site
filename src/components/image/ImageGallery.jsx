import React, { Component } from "react";
import { connect } from "react-redux";
import { removeImage } from "../../actions/images";

const initialState = {
  readyToDelete: false,
  publicId: "",
  imageId: 0
};
class ImageGallery extends Component {
  state = initialState;

  removeAction = (publicId, imageId) => {
    this.setState({
      readyToDelete: true,
      publicId,
      imageId
    });
    // console.log(publicId);
  };

  cancelDelete = () => {
    this.setState(initialState);
  };

  deleteImage = () => {
    this.props.removeImage(this.state.publicId, this.state.imageId);
    this.setState(initialState);
  };

  render() {
    if (this.props.myAdvert) {
      return (
        <div>
          <h4>Gallery</h4>
          {this.state.readyToDelete ? (
            <div>
              <h5>Ready to delete image?</h5>
              <button onClick={this.deleteImage}>Delete</button>
              <button onClick={this.cancelDelete}>Cancel</button>
            </div>
          ) : (
            ""
          )}
          {this.props.advert.advert_images.map((imageCon, i) => (
            <img
              key={i}
              src={imageCon.image.url}
              width="150"
              height="150"
              onClick={() =>
                this.removeAction(imageCon.image.public_id, imageCon.image.id)
              }
              alt={`${this.props.advert.address}, property ${
                this.props.advert.isForSale ? "for sale - " : "for rent - "
              }${this.props.advert.price}${
                this.props.advert.isForSale ? "EUR" : "EUR/month"
              }`}
            />
          ))}
        </div>
      );
    } else {
      return (
        <div>
          <h4>Gallery</h4>
          {this.props.advert.advert_images.map((imageCon, i) => (
            <img
              key={i}
              src={imageCon.image.url}
              width="150"
              height="150"
              alt={`${this.props.advert.address}, property ${
                this.props.advert.isForSale ? "for sale - " : "for rent - "
              }${this.props.advert.price}${
                this.props.advert.isForSale ? "EUR" : "EUR/month"
              }`}
            />
          ))}
        </div>
      );
    }
  }
}

export default connect(null, { removeImage })(ImageGallery);
