"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

// FIREBASE
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

import { redirect } from "next/navigation";

import { useRouter } from "next/router";

export default function Profile() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");

  useEffect(() => {
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
      return;
    }
    fetchUserName();
  }, [user, loading]);

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Navbar />
      <div className="flex flex-col z-10 w-full min-h-screen items-center p-10 sm:p-15 lg:p-28">
        <div className="flex flex-col w-full">
          <p className="font-eina font-bold mb-5 text-3xl sm:text-4xl lg:text-5xl">
            Details
          </p>
          <div className="flex flex-row justify-between items-baseline w-full p-0">
            <p className="font-eina font-semibold text-2xl sm:text-3xl lg:text-4xl">
              Placeholder Name
              {name}
            </p>
            <p className="font-eina font-semibold opacity-90 text-xl sm:text-xl lg:text-2xl">
              name
            </p>
          </div>
          <div className="flex flex-row justify-between items-baseline w-full p-0">
            <p className="font-eina font-semibold text-2xl sm:text-3xl lg:text-4xl">
              {user?.email}
            </p>
            <p className="font-eina font-semibold opacity-90 text-xl sm:text-xl lg:text-2xl">
              email
            </p>
          </div>
          <div className="flex flex-row justify-between items-baseline w-full p-0">
            <p className="font-eina font-semibold text-2xl sm:text-3xl lg:text-4xl">
              +079 123 45 67
            </p>
            <p className="font-eina font-semibold opacity-90 text-xl sm:text-xl lg:text-2xl">
              phone number
            </p>
          </div>
          <div className="flex flex-row justify-between items-baseline w-full p-0">
            <p className="font-eina font-semibold text-2xl sm:text-3xl lg:text-4xl">
              YYYY-MM-DD
            </p>
            <p className="font-eina font-semibold opacity-90 text-xl sm:text-xl lg:text-2xl">
              personnumer
            </p>
          </div>
          <div className="mt-10">
            <button
              onClick={logout}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
