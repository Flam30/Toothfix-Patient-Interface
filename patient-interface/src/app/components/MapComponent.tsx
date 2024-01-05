import {APIProvider, Map, Marker, AdvancedMarker, InfoWindow, useAdvancedMarkerRef} from '@vis.gl/react-google-maps';
import React from 'react';
import { ClinicMarker, ClinicMarkerProps } from './ClinicMarker';

export function MapComponent() {
  const mapCenter = { lat: 57.70921358199699, lng: 11.973907847754571 };
  const markers : ReadonlyArray<ClinicMarkerProps> = [
    {
      position: {lat: 57.70981182062649, lng: 11.939436298143544},
      name: "Karlatornet"
    },
    {
      position: {lat: 57.70061334271214, lng: 11.954265175470795},
      name: "Pustervik"
    }
  ]

  return (
    <div className="w-full h-[280px] sm:h-[450px] md:h-[550px]">
      <APIProvider apiKey={'AIzaSyAFkQtGnPJcOIjEQHqH52LrCPB1uSDP1uk'}>
        <Map center={mapCenter} zoom={12} mapId={'clinicMap'}>
          {markers.map((marker: ClinicMarkerProps, i) => (
            <ClinicMarker position={marker.position} name={marker.name} key={i} />
          ))}
        </Map>
      </APIProvider>
    </div>
  );
}
export default MapComponent;