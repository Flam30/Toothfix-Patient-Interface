import React, { useRef, useEffect } from 'react'
import { Wrapper, Status } from "@googlemaps/react-wrapper";

// Default center of the map
const mapCenter: google.maps.LatLngLiteral = { lat: 57.70921358199699, lng: 11.973907847754571 }

// Array of markers that are displayed on the map
const markersArray: ReadonlyArray<google.maps.LatLngLiteral> = [
  {lat: 57.70981182062649, lng: 11.939436298143544},
  {lat: 57.70061334271214, lng: 11.954265175470795}
]

const render = (status: Status): any => {
    if (status === Status.LOADING) return <h3>{status}...</h3>;
    if (status === Status.FAILURE) return <h3>{status}</h3>;
    return null;
  };

export const addMarkers = ({
    markers,
    map,
  }: {
    markers: ReadonlyArray<google.maps.LatLngLiteral>;
    map: google.maps.Map | null | undefined;
  }) =>
    markers.map(
      position =>
        new google.maps.Marker({
          position,
          map,
        }),
    );

export function Map({
    zoom
  }: {
    zoom: number;
  }) {
    const ref:any = useRef();
  
    useEffect(() => {
      const map = new window.google.maps.Map(ref.current, {
        center: mapCenter,
        zoom,
      });
      addMarkers({ markers: markersArray, map });
    });
  
    return <div ref={ref} id="map" className= "w-full h-[280px] sm:h-[450px] md:h-[550px]"/>;
  }

export function MapComponent() {
    return (
      <Wrapper apiKey="AIzaSyAFkQtGnPJcOIjEQHqH52LrCPB1uSDP1uk" render={render}>
        <Map zoom={12} />
      </Wrapper>
    );
}