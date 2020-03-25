import React, { Component } from "react";
import Leaflet from "leaflet";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

Leaflet.Icon.Default.imagePath = "../node_modules/leaflet";

delete Leaflet.Icon.Default.prototype._getIconUrl;

Leaflet.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

const initialState = {
  zoom: 20,
  updated: false
};

//TIMER TO PREVENT NEW PROPS RECEIVING LAG
const timeOut = async t => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Completed in ${t}`);
    }, t);
  });
};

export default class MapDisplay extends Component {
  state = initialState;

  componentDidMount = async () => {
    await timeOut(2000).then(() => {
      this.setState({
        ...this.state,
        updated: true
      });
    });
  };

  render() {
    if (this.state.updated) {
      const position = [this.props.lat, this.props.lon];
      return (
        <Map
          center={position}
          zoom={this.state.zoom}
          style={{ height: "400px" }}
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>Son Konum</Popup>
          </Marker>
        </Map>
      );
    } else {
      return <h4>Loading Map. Please wait.</h4>;
    }
  }
}
