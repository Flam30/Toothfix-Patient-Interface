'use client';

import React, { useEffect, useState } from 'react';

import {
  signInWithGoogle,
  auth,
  logInWithEmailAndPassword
} from '../firebase';

import { useAuthState } from 'react-firebase-hooks/auth';

import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);

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
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => loginButton(email, password)}
            >
              Sign In
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button" onClick={googleButton}
            >
              Sign In with Google
            </button>
          </div>
          {/* regirster button */}
          <div className="flex items-center justify-between mu-4">
            <p className='text-center text-black'>Don&apos;t have an account? <Link className='underline' href="/register">Register</Link> now.</p>
          </div>
          <div className="flex items-center justify-between mu-4">
            <p className='text-center text-black'>Problems logging in? <Link className='underline' href="/pwdreset">Reset your password</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}

function googleButton() {
  signInWithGoogle()
}

function loginButton(email: string, password: string) {
  // check the email format
  // TODO: add some more checks
  if (!email.includes('@')) {
    alert("Invalid email format")
    return
  }

  logInWithEmailAndPassword(email, password)
}

function registerButton() {
  console.log("register button clicked")
}