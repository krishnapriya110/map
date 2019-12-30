import React,{useState,useRef} from 'react'
import "mapbox-gl/dist/mapbox-gl.css"
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css"
import MapGL from "react-map-gl";
import DeckGL, { GeoJsonLayer } from "deck.gl";
import Geocoder from "react-map-gl-geocoder";
import config from '../config';


const token = config.Map_Token;
// const token = process.env.REACT_APP_TOKEN 



export const Searchable = (props) => {

    const [viewport,updateViewPort] = useState({
        latitude: 0,
        longitude: 0,
        zoom: 1
    });

    const [searchResultLayer, updateSearchResultLayer] = useState(null);

    // const mapRef= null;

    const mapRef = useRef(null);

  
    //   // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
     let  handleGeocoderViewportChange = viewport => {
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
        })
      }
    return (
        <div style={{ height: '100vh'}}>
            <h1 style={{textAlign: 'center', fontSize: '25px', fontWeight: 'bolder' }}>
                Use the search bar to find a location or click
                <a href="/">here</a> 
                to find your location
            </h1>
            <MapGL 
             ref={mapRef}       
            {...viewport}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            width="100%"
            height="90%"
            onViewportChange={e=>updateViewPort({...viewport,...e})}
            mapboxApiAccessToken={token}
            >
          
                <Geocoder 
                mapRef={mapRef}
                onResult={handleOnResult}
                onViewportChange={handleGeocoderViewportChange}
                mapboxApiAccessToken={token}
                position='top-left'
                />
            </MapGL>
            <DeckGL {...viewport} layers={[searchResultLayer]} />
        </div>
    )
}


















