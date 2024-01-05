import React, {useState} from 'react';
import { AdvancedMarker, InfoWindow, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';

export interface ClinicMarkerProps {
    position: google.maps.LatLngLiteral;
    name: string;
  }

export const ClinicMarker = ({ position, name }: ClinicMarkerProps): JSX.Element => {
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [markerRef, marker] = useAdvancedMarkerRef();

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        onClick={() => setIsInfoVisible(true)}
        position={position}
        title={name}
      />
      {isInfoVisible && (
        <InfoWindow
          anchor={marker}
          maxWidth={200}
          onCloseClick={() => setIsInfoVisible(false)}>
          <div className='text-black my-1'>{name}</div>
          <button className='text-white bg-blue-600 p-1 rounded'>Book</button>
        </InfoWindow>
      )}
    </>
  );
};