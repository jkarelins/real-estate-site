import React, { Component } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";

const position = [51.505, -0.09];
const map = (
  <Map center={position} zoom={13}>
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    />
    <Marker position={position}>
      <Popup>
        A pretty CSS3 popup.
        <br />
        Easily customizable.
      </Popup>
    </Marker>
  </Map>
);

export default class ViewMap extends Component {
  render() {
    return <div>{map}</div>;
  }
}
