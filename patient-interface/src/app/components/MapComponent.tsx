import React, { useRef, useEffect } from 'react'

// Default center of the map
const mapCenter: google.maps.LatLngLiteral = { lat: 57.70921358199699, lng: 11.973907847754571 }

const zoom: number = 12

// Array of markers that are displayed on the map
const markersArray: ReadonlyArray<google.maps.LatLngLiteral> = [
  {lat: 57.70981182062649, lng: 11.939436298143544},
  {lat: 57.70061334271214, lng: 11.954265175470795}
]

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

export function MapComponent({
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