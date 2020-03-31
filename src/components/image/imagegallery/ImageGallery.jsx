import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { removeImage } from "../../../actions/images";
import "./gallery.css";
import ImageCard from "./ImageCard";

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
        <div className="row mt-3">
          <div className="col-12">
            <h4>Gallery</h4>
          </div>
          {this.state.readyToDelete ? (
            <div className="col-12 text-center">
              <div className="col-12">
                <div className="alert alert-warning" role="alert">
                  You are about to delete one of your images. It is higlighted
                  now.
                </div>
              </div>
              <div className="col-12 mb-3">
                <h5>Are you sure you want to delete it?</h5>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={this.deleteImage}
                >
                  Delete
                </button>
                <button
                  className="btn btn-sm btn-warning ml-3"
                  onClick={this.cancelDelete}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="row">
            {this.props.advert.advert_images.map((imageCon, i) => (
              <ImageCard
                imageCon={imageCon}
                key={i}
                removeAction={this.removeAction}
                advert={this.props.advert}
                imageId={this.state.imageId}
              />
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
