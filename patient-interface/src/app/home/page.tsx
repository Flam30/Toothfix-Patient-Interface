import React from 'react'
import Image from 'next/image'

const home = () => {
  return (
    <main className="flex flex-col min-h-screen items-center">
      <div className="h-16 bg-white min-w-full"></div>
      <div className="flex flex-col z-10 min-h-screen w-full items-center p-32">
        <div className="flex flex-row w-full items-center justify-between">
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-start w-[40rem]">
              <p className="font-sans font-bold text-6xl">Schedule with ease,</p>
              <p className="font-sans font-bold text-6xl mt-1">smile with confidence</p>
              <p className="font-sans font-bold text-4xl mt-5">book {' '} 
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
      
    </main>
  )
}
//class="flex min-h-screen flex-col items-center justify-between p-24"

export default home