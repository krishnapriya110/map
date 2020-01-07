import React, { useState, Fragment, useEffect } from "react";
import MapGL, {
  Source,
  Layer,
  FeatureState,
  Popup,
  Marker,
  GeolocateControl
} from "@urbica/react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import config from "../config";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import data from "../dtat.geojson";
import Draggable from "react-draggable";

// const selectedBuilding = new Map();

export const Dummydata = props => {
  const [viewport, updateViewport] = useState({
    width: "500%",
    height: "200vh",

    latitude: 36.77522110827894,
    longitude: -76.32207269478184,
    zoom: 15.5
  });

  const style = {
    padding: "10px",
    color: "#fff",
    cursor: "pointer",
    background: "#1978c8",
    borderRadius: "6px",
    marginLeft: "20px",
    marginBottom: "68px"
  };

  const quakeInfo = {
    position: "absolute" as "absolute",
    fontFamily: "sans-serif",
    marginTop: "5px",
    marginLeft: "5px",
    padding: " 5px",
    width: "30%",
    border: "2px solid black",
    fontSize: "14px",
    color: "#222",
    backgroundColor: "#fff",
    borderRadius: "3px",
    top: "10px",
    left: "10px",
    zIndex: 99
  };

  const toggleButtonStyle = {
    position: "absolute" as "absolute",
    bottom: "10px",
    left: "45%",
    zIndex: 99
  };

  // change this to selected id, if compare true /ask dependss the logic
  //if ?
  //selected building will have multiple inputs
  //
  const [clickedId, setClickedId] = useState(null);

  const [popupData, updatePopUpData] = useState(null);

  const [isTwoD, updateTwoDFlag] = useState(false);

  const [comparingBuildings, updateComparingBuildings] = useState(new Map());

  let testEvent = e => {
    console.log(e);
    console.log("featureId", e.features[0].id);
    updatePopUpData(null);
    if (e.features.length > 0) {
      const hoveredStateId = e.features[0].id;
      let coordinates = e.features[0].geometry.coordinates[0][0].slice();
      console.log("idd", coordinates);

      let name = e.features[0].properties.NAME;

      console.log("idnamd", name);

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      updatePopUpData({ coordinate: coordinates, details: name });
      onSelectBuilding(hoveredStateId, e.features[0].properties);

      if (hoveredStateId !== clickedId && hoveredStateId) {
        console.log("hi", hoveredStateId);
        let selectedBuilding = {};
        selectedBuilding[hoveredStateId] = e.features[0].properties;
        setClickedId(selectedBuilding);
      }
    }
  };

  let closePopup = e => {
    updatePopUpData(null);
    return true;
  };

  let onSelectBuilding = (id, property) => {
    console.log("1st", comparingBuildings);
    if (comparingBuildings.has(id)) {
      comparingBuildings.delete(id);
    } else {
      comparingBuildings.set(id, property);
    }
    updateComparingBuildings(comparingBuildings);
  };

  return (
    <div className="wrapper" style={{ position: "relative" as "relative" }}>
      <MapGL
        style={{
          width: `${window.innerWidth}px`,
          height: `${window.innerHeight - 85}px`
        }}
        mapStyle="mapbox://styles/mapbox/light-v9"
        accessToken={config.Map_Token}
        onViewportChange={viewport => updateViewport({ ...viewport })}
        {...viewport}
        pitch={isTwoD ? 0 : 45}
        bearing={isTwoD ? 0 : -17.6}
        antialias={true}
        zoom={15}
        container="map"
      >
        {popupData && (
          <Fragment>
            {/* <Popup
              longitude={popupData.coordinate[0]}
              latitude={popupData.coordinate[1]}
              closeButton={e => closePopup(e)}
              closeOnClick={false}
              // onDragEnd={onDragEnd}
              draggable
            >
              {popupData.details}
            </Popup> */}
            <Marker
              key={clickedId}
              longitude={popupData.coordinate[0]}
              latitude={popupData.coordinate[1]}
            >
              {/* <div style={style} /> */}
            </Marker>
          </Fragment>
        )}
        <Source id="route" type="geojson" data={data} />
        <Layer
          id="route"
          type="fill-extrusion"
          source="route"
          onClick={e => testEvent(e)}
          paint={{
            "fill-extrusion-color": [
              "case",
              ["boolean", ["feature-state", "clicked"], false],
              "green",
              "red"
            ],
            "fill-extrusion-height": isTwoD ? 0 : ["get", "height"],

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
        <GeolocateControl position="top-right" />

        {comparingBuildings.size > 0 && (
          <Fragment>
            {[...comparingBuildings.keys()].map(selectedBuildingId => (
              <Fragment key={selectedBuildingId}>
                <FeatureState
                  id={selectedBuildingId}
                  source="route"
                  state={{ clicked: true }}
                />
              </Fragment>
            ))}
          </Fragment>
        )}
      </MapGL>
      {comparingBuildings.size > 0 && (
        <Draggable>
          <div className="quakeInfo" style={quakeInfo}>
            {console.log("selected", comparingBuildings)}
            {[...comparingBuildings.keys()].map(selectedBuildingId => (
              <Fragment key={selectedBuildingId}>
                <div>
                  <strong>Name:</strong>{" "}
                  <span id="mag">
                    {comparingBuildings.get(selectedBuildingId).NAME}
                  </span>
                </div>
                <div>
                  <strong>Location:</strong> <span id="loc"></span>
                </div>
                <div>
                  <strong>Date:</strong> <span id="date"></span>
                </div>
                <hr />
              </Fragment>
            ))}
          </div>
        </Draggable>
      )}

      <div
        className="toggleButton"
        style={toggleButtonStyle}
        onClick={() => updateTwoDFlag(!isTwoD)}
      >
        <button>toogle 2D/3D</button>
      </div>
    </div>
  );
};
