import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchAdvert } from "../../actions/advert";
import { likeAdvert } from "../../actions/likes";
import { checkAppointment, cancelAppointment } from "../../actions/appointment";

import AddAppointment from "./AddAppointment";
import ImagesUpload from "../image/ImagesUpload";
import ImageGallery from "../image/imagegallery/ImageGallery";
import AdvertExtras from "../extras/AdvertExtras";
import ViewMap from "../map/ViewMap";
import ShowAppointment from "../appointment/ShowAppointment";
import UserCard from "./UserCard";

class SelectedAdvert extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchAdvert(id);
    if (this.props.user && this.props.advert) {
      this.props.checkAppointment();
    }
  }

  likeAdvert = () => {
    const { id } = this.props.match.params;
    this.props.likeAdvert(id);
  };

  cancelAppointment = id => {
    this.props.cancelAppointment(id);
  };

  numberWithSpaces = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  contentForAll = () => {
    console.log(this.props.advert);
    return (
      <div className="container mt-3">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li class="breadcrumb-item">
              <Link>{this.props.advert.city}</Link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              {this.props.advert.address}, {this.props.advert.city},{" "}
              {this.props.advert.postcode}
            </li>
          </ol>
        </nav>
        <h1>
          {this.props.advert.address}, {this.props.advert.city}
        </h1>
        <p>{this.props.advert.postcode}</p>
        <hr />
        <h2>
          {this.numberWithSpaces(this.props.advert.price)}{" "}
          {this.props.advert.isForSale ? "EUR" : "EUR/month"}
        </h2>
        <div className="row">
          <div className="col-12 col-md-12 col-lg-3 col-xl-3">
            {this.props.user ? (
              this.props.liked ? (
                <button
                  className="btn btn-outline-warning"
                  onClick={this.likeAdvert}
                >
                  DisLike
                </button>
              ) : (
                <button className="btn btn-success" onClick={this.likeAdvert}>
                  Like
                </button>
              )
            ) : (
              ""
            )}
            <hr />
            <AdvertExtras advert={this.props.advert} myAdvert={false} />
            <div>
              {this.props.user ? (
                this.props.user.user.id !== this.props.advert.userId ? (
                  this.props.isAppointment ? (
                    <h4>you have created appointment for this advertisement</h4>
                  ) : (
                    <AddAppointment />
                  )
                ) : (
                  ""
                )
              ) : (
                "To make appointment you should Login or SignUp"
              )}
            </div>
          </div>
          <div className="col-12 col-md-12 col-lg-8 col-xl-8 ml-auto">
            <ImageGallery advert={this.props.advert} myAdvert={false} />
            <div className="col-12 mt-3">
              <UserCard user={this.props.advert.user} />
            </div>
          </div>
          <div className="col-12">
            <p>{this.props.advert.description}</p>
          </div>
        </div>
        <ViewMap lat={this.props.advert.lat} lon={this.props.advert.lon} />
      </div>
    );
  };

  render() {
    if (!this.props.advert) {
      return <h1>Sorry this advert is not found</h1>;
    } else if (this.props.advert && this.props.myAdverts) {
      const { id } = this.props.advert;
      if (this.props.myAdverts.some(advert => advert.id === id)) {
        const mySelectedAdvert = this.props.myAdverts.find(
          advert => advert.id === id
        );
        const activeAppointments = mySelectedAdvert.advert_appointments
          .filter(appCon => {
            if (appCon) {
              if (appCon.appointment.status === "published") {
                return true;
              }
            }
            return false;
          })
          .map(appCon => appCon.appointment);
        const canceledAppointments = mySelectedAdvert.advert_appointments
          .filter(appCon => {
            if (appCon) {
              if (appCon.appointment.status === "canceled") {
                return true;
              }
            }
            return false;
          })
          .map(appCon => appCon.appointment);

        return (
          <Fragment>
            <ImagesUpload />
            <h4>{mySelectedAdvert.address}</h4>
            <h5>{mySelectedAdvert.postcode}</h5>
            <ImageGallery advert={this.props.advert} myAdvert={true} />
            <hr />

            <AdvertExtras advert={this.props.advert} myAdvert={true} />

            <h4>Active Appointments:</h4>
            {activeAppointments.map((app, i) => (
              <ShowAppointment
                key={i}
                appointment={app}
                cancelAppointment={this.cancelAppointment}
              />
            ))}
            <hr />

            <h4>Canceled Appointments</h4>
            {canceledAppointments.map((app, i) => (
              <ShowAppointment
                key={i}
                appointment={app}
                cancelAppointment={this.cancelAppointment}
              />
            ))}
            <hr />

            <h4>Map</h4>
            <ViewMap lat={this.props.advert.lat} lon={this.props.advert.lon} />
          </Fragment>
        );
      } else {
        return this.contentForAll();
      }
    } else {
      return this.contentForAll();
    }
  }
}

function mapStateToProps(state) {
  if (state.advertReducer.selectedAdvert && state.likeReducer.likedAdverts) {
    return {
      user: state.userReducer,
      advert: state.advertReducer.selectedAdvert,
      myAdverts: state.advertReducer.myAdverts,
      liked: state.likeReducer.likedAdverts.find(
        advert => advert.advertId === state.advertReducer.selectedAdvert.id
      ),
      isAppointment: state.appointmentReducer.checkedAppointment
        ? state.appointmentReducer.checkedAppointment.found
        : true
    };
  }
  return {
    user: state.userReducer
  };
}

export default connect(mapStateToProps, {
  fetchAdvert,
  likeAdvert,
  checkAppointment,
  cancelAppointment
})(SelectedAdvert);
