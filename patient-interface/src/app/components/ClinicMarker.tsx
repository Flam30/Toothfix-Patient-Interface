import React, { useState } from "react";
import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { useRouter } from "next/navigation";

export interface ClinicMarkerProps {
  position: google.maps.LatLngLiteral;
  name: string;
  address: string;
  hours: string;
}

export const ClinicMarker = ({
  position,
  name,
  address,
  hours,
}: ClinicMarkerProps): JSX.Element => {
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const router = useRouter();

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
          onCloseClick={() => setIsInfoVisible(false)}
        >
          <div className="text-black my-1">
            <b>{name}</b>
          </div>
          <div className="text-black my-1">{address ? address : "Address"}</div>
          <div className="text-black my-1">
            {hours ? hours : "09:00 AM - 5:00 PM"}
          </div>
          <button
            className="text-white bg-blue-600 p-1 rounded"
            onClick={() => router.push("/clinicselect")}
          >
            Book
          </button>
        </InfoWindow>
      )}
    </>
  );
};
