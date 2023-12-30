"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Details from "../components/Details";

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
    }
    fetchUserName();
  }, [user, loading]);

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Navbar />
      <div className="flex flex-col z-10 w-full min-h-screen items-center p-10 sm:p-15 lg:p-28">
        <Details />
        <div className="flex flex-col w-full mt-8">
          <h1 className="font-eina font-bold mb-5 text-3xl sm:text-4xl lg:text-5xl">
            Bookings
          </h1>
          <div className="w-[566px] h-[107px] bg-accent"></div>
          <div className="flex flex-row items-baseline w-full h-[50px] bg-accent">
            <p className="font-eina font-semibold text-2xl">
              {"11:30 - 12:00"}
              <span className="font-eina font-semibold opacity-70">/</span>
              {"12/12/2023"}
              <span className="font-eina font-semibold opacity-70">...</span>
              {"@ Summerbloom Dental w/ J.Smith"}
              <span className="font-eina font-semibold opacity-70">...</span>
              {"cancel?"}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
