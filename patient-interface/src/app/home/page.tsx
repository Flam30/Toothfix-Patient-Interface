import React from 'react'
import Image from 'next/image'

const home = () => {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="h-16 bg-white min-w-full"></div>
      <div className='flex flex-col items-start w-[700px]'>
        <p className="font-sans font-bold text-5xl">Schedule with ease,</p>
        <p className="font-sans font-bold text-5xl">smile with confidence</p>
      </div>
    </main>
  )
}

export default home