'use client';

import React, { useState } from 'react'

import {
    sendPasswordReset
} from '../firebase';
import { set } from 'firebase/database';


export default function PwdReset() {
  const [email, setEmail] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  async function resetPwd(email: string) {
    setShowLoading(true)

    await sendPasswordReset(email).then(() => {
      setShowSuccess(true)
      setShowLoading(false)
    }).catch(() => {
      setShowLoading(false)
      });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="youremail@email.com"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => resetPwd(email)}
            >
              Send recovery email
            </button>
          </div>
        </form>
        {/* loading banner */}
        { showLoading ?
          <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Processing!</strong>
            <span className="block sm:inline">  Please wait a moment</span>
          </div>
          : null
        }
        {/* success banner */}
        { showSuccess ? 
          <div className="bg-red-100 border border-light-green-400 text-light-green-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline">  A recovery link was sent</span>  
          </div>
          : null
        }
      </div>
    </div>
  )
}
