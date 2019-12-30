import React, { useState, Fragment } from "react";
import MapGL, { Source, Layer, FeatureState } from "@urbica/react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import config from "../config";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";

export const UberMapbox = props => {
  const [viewport, updateViewport] = useState({
    width: "500%",
    height: 900,
    latitude: 40.7135,
    longitude: -74.0066,
    zoom: 15.5
  });
  
  const [clickedId, setClickedId] = useState(null);

  let testEvent = e => {
    console.log("feature", e);
    if (e.features.length > 0) {
      const hoveredStateId = e.features[0].id;

      if (hoveredStateId !== clickedId && hoveredStateId) {
        console.log(hoveredStateId, "hoveredStateId");
        setClickedId(hoveredStateId);
      }
    }
  };

  return (
    <Fragment>
      <MapGL
        style={{ width: "100%", height: "400vh" }}
        // center={[-76.32203271750838,36.775232645399406]}
        mapStyle="mapbox://styles/mapbox/light-v9"
        accessToken={config.Map_Token}
        onViewportChange={viewport => updateViewport({ ...viewport })}
        {...viewport}
        pitch={45}
        bearing={-17.6}
        antialias={true}
        container="map"
      >
        <Source
          id="route"
          type="geojson"
          data="http://public-chesva.opendata.arcgis.com/datasets/a8927260f1c649abaabc306dcea6129c_9.geojson"
        />
        {/* <Layer
                id="route"
                type="line"
                source="route"
                layout={{
                  'line-join': 'round',
                  'line-cap': 'round'
                }}
                paint={{
                  'line-color': '#888',
                  'line-width': 8
                }}
                /> */}
        <Layer
          id="route"
          type="fill-extrusion"
          source="composite"
          source-layer="building"
          zoom={15.5}
          onClick={e => {
            console.log(e);
            testEvent(e);
          }}
          // layout={{
          // 'line-join': 'round',
          // 'line-cap': 'round'
          // }}

          paint={{
            "fill-extrusion-color": [
              "case",
              ["boolean", ["feature-state", "clicked"], false],
              "blue",
              "gray"
            ],

            // use an 'interpolate' expression to add a smooth transition effect to the
            // buildings as the user zooms in
            "fill-extrusion-height": [
              "interpolate",
              ["linear"],
              ["zoom"],
              15,
              0,
              15.05,
              ["get", "height"]
            ],
            "fill-extrusion-base": [
              "interpolate",
              ["linear"],
              ["zoom"],
              15,
              0,
              15.05,
              ["get", "min_height"]
            ],
            "fill-extrusion-opacity": 0.6
          }}
        />

        {clickedId && (
          <FeatureState
            id={clickedId}
            source="composite"
            sourceLayer="building"
            state={{ clicked: true }}
          />
        )}
      </MapGL>
      ;
    </Fragment>
  );
};
