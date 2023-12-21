import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import GeoCoderMarker from "./GeoCoderMarker";

const Map = ({ location }) => {
  const defaultCenter = [53.35, 18.8];
  return (
    <MapContainer
      center={[53, 35, 18.8]}
      zoom={1}
      scrollWheelZoom={false}
      style={{
        height: "40vh",
        width: "100%",
        marginTop: "20px",
        zIndex: 1,
        backgroundColor: "red",
      }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <GeoCoderMarker location={`${location}`} />
    </MapContainer>
  );
};

export default Map;
