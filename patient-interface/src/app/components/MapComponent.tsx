import { APIProvider, Map } from "@vis.gl/react-google-maps";
import React, { useEffect, useState } from "react";
import { ClinicMarker, ClinicMarkerProps } from "./ClinicMarker";
import axios from "axios";

export function MapComponent() {
  const API_URL = "http://localhost:3005";
  const mapCenter = { lat: 57.70921358199699, lng: 11.973907847754571 };
  const [markers, setMarkers] = useState<ReadonlyArray<ClinicMarkerProps>>([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/booking/clinics/`)
      .then((res) => {
        // for each object in res.data, create a marker
        let newMarkers: ClinicMarkerProps[] = [];
        res.data.forEach((clinic: any) => {
          newMarkers.push({
            position: { lat: clinic.lat, lng: clinic.lng },
            name: clinic.name,
            address: clinic.address,
            hours: clinic.hours,
          });
          setMarkers(newMarkers);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="w-full h-[280px] sm:h-[450px] md:h-[550px]">
      <APIProvider apiKey={"AIzaSyAFkQtGnPJcOIjEQHqH52LrCPB1uSDP1uk"}>
        <Map center={mapCenter} zoom={12} mapId={"clinicMap"}>
          {markers.map((marker: ClinicMarkerProps, i) => (
            <ClinicMarker
              position={marker.position}
              name={marker.name}
              address={marker.address}
              hours={marker.hours}
              key={i}
            />
          ))}
        </Map>
      </APIProvider>
    </div>
  );
}
export default MapComponent;
