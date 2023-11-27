'use client';

import React, { useEffect, useState } from "react";

// FIREBASE
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../firebase";

// AXIOS
import axios from "axios";
const API_URL = "http://localhost:3005";

// ROUTING AND LINKING
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Booking() {
  // start and end of the appointment
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  
  const [user, loading, error] = useAuthState(auth);

  const router = useRouter();

  // Redirect if not logged in
  useEffect(() => {
    if(loading) return;
    if(!user) { router.push('/login'); return; }
  }, [user, loading, router]);

  // send the booking info
  async function sendBooking(start: string, end: string) {
    // send to the API gateway
    await axios.post(`${API_URL}/booking/bookings`, {
      date: "2021-27-11",
      start: start,
      end: end,
      dentist: "6564873855bd195cdf2a7a4e",
      patient: "6564cea19cbd695c17275662"
    }).then(() => {
      router.push('/booking')
    }).catch((err) => {
      console.log(err);
    });
  }

  return (
    <div>
      <form className="bg-slate-700 shadow-md rounded px-8 pt-6 pb-8 mb-4">

        <label htmlFor="meeting-start-time">Appointment start:</label>

        <input
          className="w-200 px-3 py-2 mb-3 text-sm leading-tight text-gray-800 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          type="datetime-local"
          onChange={(e) => setStart(e.target.value)}
          id="meeting-start-time"
          name="meeting-start-time"
          min="2023-11-27T19:30"
          max="2024-11-27T19:30" />

        <label htmlFor="meeting-end-time">Appointment end:</label>

        <input
          className="w-200 px-3 py-2 mb-3 text-sm leading-tight text-gray-800 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          type="datetime-local"
          onChange={(e) => setEnd(e.target.value)}
          id="meeting-end-time"
          name="meeting-end-time"
          min="2023-11-27T19:30"
          max="2024-11-27T19:30" />

        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => sendBooking(start, end)}
          >
            Send
        </button>

      </form>

      
      <table className="w-full table-fixed text-sm text-center text-gray-500 dark:text-gray-400">
        <thead className="text-gray-700 uppercase dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
              Monday
            </th>
            <th scope="col" className="px-6 py-3">
              Tuesday
            </th>
            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
              Wednesday
            </th>
            <th scope="col" className="px-6 py-3">
              Thursday
            </th>
            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
              Friday
            </th>
            <th scope="col" className="px-6 py-3">
              Saturday
            </th>
          </tr>
        </thead>
        <tbody>

        </tbody>
      </table>
    </div>
  )
}