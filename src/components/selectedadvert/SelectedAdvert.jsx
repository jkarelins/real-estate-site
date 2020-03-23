import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { fetchAdvert } from "../../actions/advert";
import { likeAdvert } from "../../actions/likes";
import AddAppointment from "./AddAppointment";

class SelectedAdvert extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchAdvert(id);
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
        <div>
          {this.props.user ? (
            this.props.user.user.id !== this.props.advert.userId ? (
              <AddAppointment />
            ) : (
              ""
            )
          ) : (
            <AddAppointment />
          )}
        </div>
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

        return (
          <Fragment>
            <h4>{mySelectedAdvert.address}</h4>
            <h5>{mySelectedAdvert.postcode}</h5>
            <h6>Appointments:</h6>
            {mySelectedAdvert.advert_appointments.map(appCon => {
              if (appCon) {
                return (
                  <div>
                    <p>
                      Date: {appCon.appointment.date}, time{" "}
                      {appCon.appointment.hours}:{appCon.appointment.minutes}{" "}
                      <br />
                      Requestor: {appCon.appointment.name},{" "}
                      {appCon.appointment.email}, phone:{" "}
                      {appCon.appointment.phone}
                    </p>
                    <p>{appCon.appointment.text}</p>

                    <hr />
                  </div>
                );
              } else {
                return <h4>Sorry no appointments found</h4>;
              }
            })}
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
      )
    };
  }
  return {
    user: state.userReducer
  };
}

export default connect(mapStateToProps, { fetchAdvert, likeAdvert })(
  SelectedAdvert
);
