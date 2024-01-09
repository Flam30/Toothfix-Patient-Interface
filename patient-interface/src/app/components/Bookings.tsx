import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";

// AXIOS
import axios from "axios";
const API_URL = "http://localhost:3005";

// TIME
import moment from "moment";

// FIREBASE
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

const Bookings: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");

  // MODAL THINGS
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  // BOOKINGS
  const [bookings, setBookings] = useState<any>([]);

  // cancel the selected booking
  function cancelBooking() {
    setShowCancelConfirm(false);
    
    if (!selectedBooking) return;

    // delete the booking
    axios.delete(`${API_URL}/booking/bookings/${selectedBooking._id}`).then(() => {
      // remove the booking from the list
      setBookings(bookings.filter((booking: any) => booking._id !== selectedBooking._id));
    });
  }

  useEffect(() => {

    // populate the clinic name and doctor names
    const populateClinicAndDoctor = async () => {
      let _bookings: any[] = [];
      try {
        // fetch the bookings
        const res = await axios.get(`${API_URL}/booking/bookings/patient/${user?.uid}`);
        _bookings = res.data;

        for (let i = 0; i < _bookings.length; i++) {
          const doctorRes = await axios.get(`${API_URL}/booking/dentists/${_bookings[i].dentist}`);
          const clinicRes = await axios.get(`${API_URL}/booking/clinics/${doctorRes.data.clinic}`);
          _bookings[i].clinic = clinicRes.data.name;
          _bookings[i].dentist = doctorRes.data.name;
        }
        setBookings(_bookings);
      } catch (err) {
        console.error(err);
        alert("An error occured while fetching clinic and doctor data");
      }
    }

    const fetchUserName = async () => {
      try {
        const q = query(collection(db, "users"), where("uid", "==", user?.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        setName(data.name);
      } catch (err) {
        console.error(err);
        alert("An error occured while fetching user data");
      }
    };

    if (loading) return;
    if (!user) {
      redirect("/login");
    }

    
    fetchUserName();
    // check if bookings are already fetched
    if(bookings.length == 0 || bookings == null) {
      populateClinicAndDoctor();
    }

  }, [user, loading, bookings]);

  return (
    <div className="flex flex-col w-full mt-8">
      <h1 className="font-eina font-bold mb-5 text-3xl sm:text-4xl lg:text-5xl">
        Bookings
      </h1>

      {/* input modal NAME */}
      {showCancelConfirm ? 
        <div>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Are you sure you want to cancel the booking?
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowCancelConfirm(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      
                    </span>
                  </button>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowCancelConfirm(false)}
                  >
                    NO
                  </button>
                  <button
                    className="bg-green-800 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow outline-none"
                    type="button"
                    onClick={() => {
                      cancelBooking();
                    }}
                  >
                    YES
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </div>
       : null}

      {/* BOOKINGS */}
      {bookings.map((booking: any) => (
        
      <div key={booking._id}>

      <div className="mb-2 hidden sm:flex flex-row flex-nowrap items-center justify-between px-2 w-full h-[47px] bg-[#d4ecf7] font-eina font-semibold text:xl lg:text-2xl">
        <div className="flex flex-row flex-nowrap shrink-0">
          {/* extract the time from the date */}
          {moment(booking.date).format("HH:mm")}
          <span className="mx-1 lg:mx-2 opacity-80">on</span>
          {/* extract the date from the date */}
          {moment(booking.date).format("DD/MM")}
          <span className="mx-1 lg:mx-2 opacity-80">at</span>
          <p className="truncate text-ellipsis max-w-[210px] lg:max-w-[340px]">
            {booking.clinic}
          </p>
          <span className="mx-1 lg:mx-2 opacity-80">w/</span>
          <p className="truncate text-ellipsis max-w-[113px] lg:max-w-[260px]">
            {booking.dentist}
          </p>
        </div>
        <div>
          <button
            className="group transition-all duration-300 ease-in-out"
            onClick={() => {
                setSelectedBooking(booking);
                setShowCancelConfirm(true);
              } 
            }
          >
            <span className="underline lg:no-underline underline-offset-1 bg-left-bottom bg-gradient-to-r from-text to-text bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
              cancel
            </span>
          </button>
        </div>
      </div>
      <div className="mb-2 sm:hidden flex flex-col items-start px-1 w-full bg-[#d4ecf7] dark:bg-darkaccent font-eina font-semibold">
        <div className="flex flex-row flex-nowrap">
          {moment(booking.date).format("HH:mm")}
          <span className="mx-1 opacity-80">on</span>
          {moment(booking.date).format("DD/MM")}
        </div>
        <div className="flex flex-row flex-nowrap">
          <span className="mr-1 opacity-80">at</span>
          <p className="truncate text-ellipsis max-w-[350px]">
            {booking.clinic}
          </p>
        </div>
        <div className="flex flex-row flex-nowrap justify-between w-full">
          <div className="flex flex-row flex-nowrap">
            <span className="mr-1 opacity-80">w/</span>
            <p className="truncate text-ellipsis max-w-[250px]">
              {booking.dentist}
            </p>
          </div>
          <div>
            <button
              className="group transition-all duration-300 ease-in-out"
              onClick={logout}
            >
              <span className="underline underline-offset-1 decoration-1">
                cancel
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  ))}

  </div>
  );
};

export default Bookings;
