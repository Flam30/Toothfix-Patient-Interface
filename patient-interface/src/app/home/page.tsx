import React from 'react'
import Image from 'next/image'

const home = () => {
  return (
    <main className="flex flex-col min-h-screen items-center">
      <div className="h-16 bg-white min-w-full"></div>
      <div className="flex flex-col z-10 min-h-screen w-full items-center p-20">
        <div className="flex flex-row w-full items-center">
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-start w-[515px]">
              <p className="font-sans font-bold text-5xl">Schedule with ease,</p>
              <p className="font-sans font-bold text-5xl">smile with confidence</p>
            </div>
          </div>
          <div className="ml-4">
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
      
    </main>
  )
}
//class="flex min-h-screen flex-col items-center justify-between p-24"

export default home