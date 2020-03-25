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

export default class MapDisplay extends Component {
  state = {
    lat: 52.3932325,
    lng: 4.6426905,
    zoom: 20
  };

  render() {
    if (this.props.lat && this.props.lon) {
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
      return <h4>Loading...</h4>;
    }
  }
}
