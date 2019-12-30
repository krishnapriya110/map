import React, { useState, useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import MapGL from "react-map-gl";
import DeckGL, { GeoJsonLayer } from "deck.gl";
import Geocoder from "react-map-gl-geocoder";
import config from "../config";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

const token = config.Map_Token;
// const token = process.env.REACT_APP_TOKEN

const Map = ReactMapboxGl({
  accessToken: token
});

export const SearchableMapBox = props => {
  const [viewport, updateViewPort] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 1
  });

  const [searchResultLayer, updateSearchResultLayer] = useState(null);

  // const mapRef= null;

  const mapRef = useRef(null);

  //   // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  let handleGeocoderViewportChange = viewport => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };

    updateViewPort({
      ...viewport,
      ...geocoderDefaultOverrides
    });
  };

  let handleOnResult = event => {
    updateSearchResultLayer({
      searchResultLayer: new GeoJsonLayer({
        id: "search-result",
        data: event.result.geometry,
        getFillColor: [255, 0, 0, 128],
        getRadius: 1000,
        pointRadiusMinPixels: 10,
        pointRadiusMaxPixels: 10
      })
    });
  };

  //   var layers = Map.getStyle().layers;

  return (
    <div style={{ height: "100vh" }}>
      <h1
        style={{ textAlign: "center", fontSize: "25px", fontWeight: "bolder" }}
      >
        Use the search bar to find a location or click
        <a href="/">here</a>
        to find your location
      </h1>
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: "100vh",
          width: "100vw"
        }}
      >
        <Layer
          id="3d-buildings"
          sourceId="composite"
          layerOptions={{
            "source-layer": "building",
            filter: ["==", "extrude", "true"],
            type: "fill-extrusion",
            minzoom: 15
          }}
          paint={{
            "fill-extrusion-color": "#aaa",
            "fill-extrusion-height": {
              type: "identity",
              property: "height"
            },
            "fill-extrusion-base": {
              type: "identity",
              property: "min_height"
            },
            "fill-extrusion-opacity": 0.6
          }}
        ></Layer>
      </Map>
      ;
    </div>
  );
};
