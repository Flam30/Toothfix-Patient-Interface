"use client";

import React, { useEffect, useState, useCallback } from "react";
import Navbar from ".././components/Navbar";

// TIME
import moment from "moment";
const MAX_WEEKS = 52;
const DAY_START = 9;
const DAY_END = 17;

// selected clinic and dentist

// FIREBASE
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../firebase";

// AXIOS
import axios from "axios";
const API_URL = "http://localhost:3005";

// ROUTING AND LINKING
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { set } from "firebase/database";

export default function Booking() {
  // start and end of the appointment
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  // BANNERS
  const [showSuccess, setShowSuccess] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  // time things
  const [currentWeek, setCurrentWeek] = useState<number>(moment().week());
  const [selectedWeek, setSelectedWeek] = useState<number>(moment().week());

  // appointment slots
  const [appointments, setAppointments] = useState<any[]>();
  // appointments sliced into a 2d array of hours
  const [appointments2d, setAppointments2d] = useState<any[][]>([]);

  const [isFetched, setIsFetched] = useState<boolean>(false);

  // fetched appointments
  const [fetchedAppointments, setFetchedAppointments] = useState<any[]>([]);

  const [user, loading, error] = useAuthState(auth);

  const [selectedClinic, setSelectedClinic] = useState<any>({});
  const [selectedDentist, setSelectedDentist] = useState<any>({});

  const router = useRouter();
  const searchParams = useSearchParams();

  // generate the appointments for each day of the week
  // if the appintment is in the fetched set, put it in the appointments array
  // otherwise create a new disabled appointment
  let generateAppointments = useCallback(
    (fetchedAppointments: any[], week: number) => {
      let appointmentsArray: any[] = [];
      let day = moment().startOf("week").week(week);

      // go thru each day
      for (let i = 0; i < 7; i++) {
        // go thru each hour from day start to day end
        for (let j = DAY_START; j < DAY_END; j++) {
          // get the current hour in ISO format
          let currentHour = moment(day)
            .hour(j)
            .format("YYYY-MM-DDTHH:mm:ss.SSSZ");
          // check if the current hour is in the fetched appointments
          let fetchedAppointment = fetchedAppointments.find((appointment) =>
            moment(appointment.date).isSame(currentHour)
          );
          // if it is, add it to the appointments array
          if (fetchedAppointment) {
            appointmentsArray.push(fetchedAppointment);
          } else {
            // otherwise create a new disabled appointment
            appointmentsArray.push({
              // id 0 means it is disabled
              _id: "0",
              date: currentHour,
            });
          }
        }

        // iterate to the next day
        day = moment(day).add(1, "d");
      }

      return appointmentsArray;
    },
    []
  );

  // slice the appointments into a 2d array
  // each row represents an hour and columns represent days
  const sliceAppointments = useCallback((appointments: any[]) => {
    // we have 8 time slots per day (9am to 5pm)
    // we have 7 days per week
    let appointments2dArray: any[8][7] = [[], [], [], [], [], [], [], []];

    // appointments array SHOULD BE already construcred and sorted by date
    // the colums of the array are the days of the week so will always be 7
    // go thru each entry in the appointments array

    // go thru every entry in the appointments array
    // day from 0 to 6
    let currentDay = 0;
    // hour from 0 to 7, where 0 is 9am and 7 is 5pm
    let currentHour = 0;

    for (let i = 0; i < appointments.length; i++) {
      // get the current appointment
      let appointment = appointments[i];

      // put the appointment in the 2d array
      appointments2dArray[currentHour][currentDay] = appointment;

      // iterate to the next hour
      currentHour++;

      // if the current hour is 8, iterate to the next day
      if (currentHour >= 8) {
        currentHour = 0;
        currentDay++;
      }
    }

    console.log(appointments2dArray);
    return appointments2dArray;
  }, []);

  // fetch the appointments from the API gateway
  const fetchAppointments = useCallback(
    (weekNumber: number) => {
      // clean the appointments
      setAppointments2d([]);
      // fetch the appointments
      axios
        .get(
          `${API_URL}/availability/slots/weekNumber/${weekNumber}/dentist/${selectedDentist._id}`
        )
        .then((res) => {
          console.log(res.data);
          setAppointments2d(sliceAppointments(generateAppointments(res.data, weekNumber)));
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [selectedDentist, sliceAppointments, generateAppointments]
  );

  // USE EFFECT HOOK
  useEffect(() => {
    function getSearchParams() {
      const clinic = searchParams.get("clinic");
      const dentist = searchParams.get("dentist");

      // fetch the clinic
      axios
        .get(`${API_URL}/booking/clinics/${clinic}`)
        .then((res) => {
          setSelectedClinic(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

      // fetch the dentist
      axios
        .get(`${API_URL}/booking/dentists/${dentist}`)
        .then((res) => {
          setSelectedDentist(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (loading) return;
    if (!user) {
      router.push("/login");
      return;
    }

    if (selectedClinic._id === undefined || selectedDentist._id === undefined) {
      getSearchParams();
    }

    if (
      !isFetched &&
      !(selectedClinic._id === undefined || selectedDentist._id === undefined)
    ) {
      fetchAppointments(selectedWeek);

      setIsFetched(true);
    }
  }, [
    user,
    loading,
    router,
    searchParams,
    selectedWeek,
    fetchedAppointments,
    generateAppointments,
    sliceAppointments,
    fetchAppointments,
    selectedClinic,
    selectedDentist,
    isFetched,
    appointments2d,
  ]);

  // send the booking info
  async function sendBooking(slotId: string, date: string) {
    // send to the API gateway
    await axios
      .post(`${API_URL}/booking/bookings`, {
        date: date,
        start: "deprecated",
        end: "deprecated",
        patient: user?.uid,
        patientEmail: user?.email,
        dentist: selectedDentist,
        slotId: slotId,
      })
      .then(() => {
        setShowLoading(false);
        setShowSuccess(true);
      })
      .catch((err) => {
        setShowLoading(false);
        console.log(err);
      });
  }

  // scoll the week forward
  function scrollWeekForward() {
    if (selectedWeek < MAX_WEEKS) {
      // refetch the appointments
      fetchAppointments(selectedWeek + 1);

      setSelectedWeek(selectedWeek + 1);
    }
  }

  // scroll the week backward
  function scrollWeekBackward() {
    if (selectedWeek > currentWeek) {
      // refetch the appointments
      fetchAppointments(selectedWeek - 1);

      setSelectedWeek(selectedWeek - 1);
    }
  }

  return (
    <div>
      <Navbar />
      {/* display the current clinic and the dentist */}
      <h1 className="text-3xl text-center">Book an appointment</h1>
      <h2 className="text-xl text-center">Clinic: {selectedClinic.name}</h2>
      <h2 className="text-xl text-center">Dentist: {selectedDentist.name}</h2>

      {/* reselect a clinic button */}
      <Link href="/clinicselect">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Reselect clinic
        </button>
      </Link>

      {/* week panel */}
      <div className="flex justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          onClick={scrollWeekBackward}
          disabled={selectedWeek <= currentWeek}
        >
          Previous week
        </button>
        <h2 className="text-xl text-center">Week {selectedWeek}</h2>
        {/* current week */}
        <h2 className="text-xl text-center">(Current week: {currentWeek})</h2>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          onClick={scrollWeekForward}
          disabled={selectedWeek >= MAX_WEEKS}
        >
          Next week
        </button>
      </div>

      <table className="w-full table-fixed text-sm text-center text-gray-500 dark:text-gray-400">
        <thead className="text-gray-700 uppercase dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
              Sunday
            </th>
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
          {/* make a button for each appointment */}
          {/* if the _id is 0, the appointment is unavailable */}
          {/* rows in the array are hours and the columns are days */}
          {appointments2d.map((hour, index) => (
            <tr key={index}>
              {hour.map((appointment) => (
                <td key={appointment._id} className="px-6 py-3">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                    onClick={() => {
                      if (appointment._id !== "0")
                      {
                        setShowLoading(true);
                        sendBooking(appointment._id, appointment.date);
                      }
                    }}
                    disabled={appointment._id === "0"}
                  >
                    {moment(appointment.date).format("HH:mm")}
                  </button>
                </td>
              ))}
            </tr>
          ))}

        </thead>
      </table>
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
            <span className="block sm:inline">  A booking request was sent</span>  
          </div>
          : null
        }
    </div>
  );
}
