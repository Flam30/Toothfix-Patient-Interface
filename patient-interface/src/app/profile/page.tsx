"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Details from "../components/Details";
import Bookings from "../components/Bookings";

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
      <div className="flex flex-col z-10 w-full min-h-screen items-center p-3 sm:p-15 lg:p-28">
        <Details />
        <Bookings />
      </div>
    </main>
  );
}
