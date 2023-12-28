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
        <div className="w-full">
          <div className="dark:bg-gray-800 p-6 rounded-lg shadow-xl">
            <p className="font-eina font-bold text-lg">Details</p>
            Logged in as
            <div>{name}</div>
            <div>{user?.email}</div>
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
