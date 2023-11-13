'use client';

import React, { useRef, useEffect } from 'react'
import Image from 'next/image'
import { Wrapper, Status } from "@googlemaps/react-wrapper";

function MapComponent({
  center,
  zoom,
}: {
  center: google.maps.LatLngLiteral;
  zoom: number;
}) {
  const ref:any = useRef();

  useEffect(() => {
    new window.google.maps.Map(ref.current, {
      center,
      zoom,
    });
  });

  return <div ref={ref} id="map" style={{ width: "800px", height: "500px" }} />;
}

const render = (status: Status): any => {
  if (status === Status.LOADING) return <h3>{status}...</h3>;
  if (status === Status.FAILURE) return <h3>{status}</h3>;
  return null;
};

const mapCenter = { lat: 57.70921358199699, lng: 11.973907847754571 }

const home = () => {
  return (
    <main className="flex flex-col min-h-screen items-center">
      <div className="h-16 bg-white min-w-full"></div>
      <div className="flex flex-col z-10 min-h-screen w-full items-center p-32">
        <div className="flex flex-row w-full items-center justify-between">
          <div className="flex flex-col items-center font">
            <div className="flex flex-col items-start w-[40rem]">
              <p className="font-eina font-bold text-6xl">Schedule with ease,</p>
              <p className="font-eina font-bold text-6xl mt-1">smile with confidence</p>
              <p className="font-eina font-bold text-4xl mt-5">book {' '} 
              <a className="group text-[#61B7DB] transition-all duration-300 ease-in-out" href="#">
                <span className="bg-left-bottom bg-gradient-to-r from-[#004D70] to-[#004D70] bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                  now
                </span>
              </a>
              </p>
            </div>
          </div>
          <div>
            <Image
              src="/images/landing-svg.svg"
              alt="Dentist Tools"
              width={493}
              height={401}
              priority
            />
          </div>
        </div>
      </div>
      <Wrapper apiKey={"AIzaSyAFkQtGnPJcOIjEQHqH52LrCPB1uSDP1uk"} render={render}>
        <MapComponent center={ mapCenter } zoom={10}/>
      </Wrapper>
    </main>
  )
}
//class="flex min-h-screen flex-col items-center justify-between p-24"

export default home