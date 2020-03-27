import React, { Component } from "react";
import { connect } from "react-redux";
import { removeImage } from "../../../actions/images";
import "./gallery.css";

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
        <div className="row">
          <div className="col-12">
            <h4>Gallery</h4>
          </div>
          {this.state.readyToDelete ? (
            <div>
              <h5>Ready to delete image?</h5>
              <button onClick={this.deleteImage}>Delete</button>
              <button onClick={this.cancelDelete}>Cancel</button>
            </div>
          ) : (
            ""
          )}
          <div className="row">
            {this.props.advert.advert_images.map((imageCon, i) => (
              <div className="col-4" key={i}>
                <img
                  src={imageCon.image.url}
                  className="img-fluid"
                  onClick={() =>
                    this.removeAction(
                      imageCon.image.public_id,
                      imageCon.image.id
                    )
                  }
                  alt={`${this.props.advert.address}, property ${
                    this.props.advert.isForSale ? "for sale - " : "for rent - "
                  }${this.props.advert.price}${
                    this.props.advert.isForSale ? "EUR" : "EUR/month"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div className="row">
          <div className="col-12">
            <h4>Gallery</h4>
          </div>
          {this.props.advert.advert_images.map((imageCon, i) => (
            <div className="col-4" key={i}>
              <img
                src={imageCon.image.url}
                className="img-fluid"
                alt={`${this.props.advert.address}, property ${
                  this.props.advert.isForSale ? "for sale - " : "for rent - "
                }${this.props.advert.price}${
                  this.props.advert.isForSale ? "EUR" : "EUR/month"
                }`}
              />
            </div>
          ))}
        </div>
      );
    }
  }
}

export default connect(null, { removeImage })(ImageGallery);
