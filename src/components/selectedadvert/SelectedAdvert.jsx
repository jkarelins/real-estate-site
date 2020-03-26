import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { fetchAdvert } from "../../actions/advert";
import { likeAdvert } from "../../actions/likes";
import { checkAppointment } from "../../actions/appointment";
import AddAppointment from "./AddAppointment";
import ImagesUpload from "../image/ImagesUpload";
import ImageGallery from "../image/ImageGallery";
import AdvertExtras from "../extras/AdvertExtras";
import ViewMap from "../map/ViewMap";
import ShowAppointment from "../appointment/ShowAppointment";

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

  contentForAll = () => {
    return (
      <div>
        <h1>{this.props.advert.postcode}</h1>
        <p>{this.props.advert.description}</p>
        {this.props.user ? (
          this.props.liked ? (
            <button onClick={this.likeAdvert}>DisLike</button>
          ) : (
            <button onClick={this.likeAdvert}>Like</button>
          )
        ) : (
          ""
        )}

        <ImageGallery advert={this.props.advert} myAdvert={false} />
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
            "Please login first"
          )}
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
          })
          .map(appCon => appCon.appointment);
        const canceledAppointments = mySelectedAdvert.advert_appointments
          .filter(appCon => {
            if (appCon) {
              if (appCon.appointment.status === "canceled") {
                return true;
              }
            }
          })
          .map(appCon => appCon.appointment);
        console.log(canceledAppointments);
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
              <ShowAppointment key={i} appointment={app} />
            ))}
            <hr />

            <h4>Canceled Appointments</h4>
            {canceledAppointments.map((app, i) => (
              <ShowAppointment key={i} appointment={app} />
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
  checkAppointment
})(SelectedAdvert);
