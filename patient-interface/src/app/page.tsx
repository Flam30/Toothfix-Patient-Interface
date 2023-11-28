'use client';

import React from 'react'
import Image from 'next/image'
import Faq from './components/Faq'
import Navbar from './components/Navbar'
import Link from "next/link";

import { MapComponent } from './components/MapComponent';

const home = () => {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Navbar/>
      <div className="flex flex-col z-10 min-h-screen items-center p-10 sm:p-15 lg:p-28">
        <div className="flex flex-row w-full items-center justify-between">
          <div className="flex flex-col items-center font">
            <div className="flex flex-col items-start w-[252.05px] sm:w-[380px] lg:w-[504.1px]">
              <span className='text-2xl sm:text-4xl lg:text-5xl'>
                <p className="font-eina font-bold">Schedule with ease,<br></br>smile with confidence</p>
              </span>
              <p className="font-eina font-bold text-xl sm:text-3xl lg:text-4xl mt-5">book {' '} 
                <Link className="group text-[#61B7DB] transition-all duration-300 ease-in-out" href="/booking">
                  <span className="bg-left-bottom bg-gradient-to-r from-[#004D70] to-[#004D70] bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                    now
                  </span>
                </Link>
              </p>
            </div>
          </div>
          <div className='hidden sm:block object-contain'>
            <Image
              src="/images/landing-svg.svg"
              alt="Dentist Tools"
              width={493}
              height={401}
              priority
            />
          </div>
        </div>
        <div className='w-full'>
          <h1 className='font-eina font-bold text-2xl sm:text-4xl lg:text-5xl mt-24 mb-4'>Map</h1>
          <MapComponent/>
        </div>
        <Faq/>
      </div>
    </main>
  )
}
//class="flex min-h-screen flex-col items-center justify-between p-24"

export default home