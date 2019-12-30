import React, { useState, Fragment } from "react";
import MapGL, {
  Source,
  Layer,
  FeatureState,
  Popup
} from "@urbica/react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import config from "../config";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import data from "../test.geojson";

export const ExternalData = props => {
  const [viewport, updateViewport] = useState({
    width: "500%",
    height: 900,

    // latitude: 1.27993969060927,
    // longitude: 103.830721774935995,
    latitude: 36.775232645399406,
    longitude: -76.32203271750838,
    zoom: 15
  });

  const [clickedId, setClickedId] = useState(null);

  const [popupData, updatePopUpData] = useState(null);

  let testEvent = e => {
    console.log("featureId", e.features[0]);
    updatePopUpData(null);
    if (e.features.length > 0) {
      const hoveredStateId = "09ead44537d94ece576c7bc001c33e53";
      let coordinates = e.features[0].geometry.coordinates[0][0].slice();
      console.log("idd", coordinates);

      let name = e.features[0].properties.BUILDINGCLASS;

      console.log("idnamd", name);

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      updatePopUpData({ coordinate: coordinates, details: name });

      if (hoveredStateId !== clickedId && hoveredStateId) {
        console.log("hi", hoveredStateId);
        setClickedId(hoveredStateId);
      }
    }
  };

  let closePopup = e => {
    updatePopUpData(null);
    return true;
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
        pitch={59.5}
        bearing={-20}
        antialias={true}
        zoom={15.5}
      >
        <Source
          id="route"
          type="geojson"
          data="http://public-chesva.opendata.arcgis.com/datasets/a8927260f1c649abaabc306dcea6129c_9.geojson"
        />

        {/* <Source id="route" type="geojson" data={data} /> */}
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
          source="route"
          // source-layer= 'building'

          onClick={e => testEvent(e)}
          // layout={{
          // 'line-join': 'round',
          // 'line-cap': 'round'
          // }}

          paint={{
            "fill-extrusion-color": [
              "case",
              ["boolean", ["feature-state", "clicked"], false],
              "green",
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
        {popupData && (
          <Popup
            longitude={popupData.coordinate[0]}
            latitude={popupData.coordinate[1]}
            closeButton={e => closePopup(e)}
            closeOnClick={false}
          >
            {popupData.details}
          </Popup>
        )}

        {clickedId && (
          <FeatureState
            id={clickedId}
            source="route"
            // sourceLayer= 'building'

            state={{ clicked: true }}
          />
        )}
      </MapGL>
      ;
    </Fragment>
  );
};
