'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';

import {
  signInWithGoogle,
  auth,
  logInWithEmailAndPassword,
  setPersistenceLocal,
  setPersistenceSession,
} from '../firebase';

import { useAuthState } from 'react-firebase-hooks/auth';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [showError, setShowError] = useState(false);


  async function loginButton(email: string, password: string) {
  
    // check the email format
    // TODO: add some more checks
    if (!email.includes('@')) {
      alert("Invalid email format")
      return
    }
  
    // log in and redirect to dashboard if successful
    await logInWithEmailAndPassword(email, password).then(() => {
      router.push('/profile')
    }).catch(() => {
      showErrorBanner()
    });
  }


  async function googleButton() {
    await signInWithGoogle().then(() => {
      router.push('/profile')
    });
  }

  function showErrorBanner() {
    setShowError(true)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <form className="bg-white dark:bg-slate-700 shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
            <label className="block text-gray-700  text-sm font-bold mb-2" htmlFor="password">
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
          {/* remember me toggle */}
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" id='presistanceToggle' className="sr-only peer" onChange={changePresistence} />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</span>
          </label>
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
            <p className='text-center text-black dark:text-gray-100'>Don&apos;t have an account? <Link className='underline' href="/register">Register</Link> now.</p>
          </div>
          <div className="flex items-center justify-between mu-4">
            <p className='text-center text-black dark:text-gray-100'>Problems logging in? <Link className='underline' href="/pwdreset">Reset your password</Link></p>
          </div>
        </form>
        {/* error banner */}
        { showError ? 
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Login failed!</strong>
            <span className="block sm:inline">  Email or password is wrong</span>  
          </div>
          : null
        }
      </div>
    </div>
  );
}

function changePresistence(event: ChangeEvent<HTMLInputElement>) {
  // if the Remember Me is checked
  if(event.target.checked) {
    setPersistenceLocal()
  } else {
    setPersistenceSession()
  }
}