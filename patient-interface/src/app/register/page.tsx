'use client';

import React, { useEffect, useState } from 'react';

import {
  signInWithGoogle,
  auth,
  registerWithEmailAndPassword
} from '../firebase';

import { useAuthState } from 'react-firebase-hooks/auth';

import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [user, loading, error] = useAuthState(auth);
  
    return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="displayName">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="displayName"
              type="displayName"
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="John Doe"
            />
          </div>
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
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => registerButton(displayName, email, password)}
            >
              Sign In
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button" onClick={googleButton}
            >
              Register with Google
            </button>
          </div>
          {/* login button */}
          <div className="flex items-center justify-between">
            <p className='text-center text-black'>Already have an account? <Link className='underline' href="/login">Log In</Link> now.</p>
          </div>
        </form>
      </div>
    </div>
  )
}

function googleButton() {
    signInWithGoogle()
}

function registerButton(name: string, email: string, password: string) {
    // check the email format
    // TODO: add some more checks
    if (!email.includes('@')) {
        alert("Invalid email format")
        return
    }

    registerWithEmailAndPassword(name, email, password)
}
