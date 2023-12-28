"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Faq from "./components/Faq";
import Navbar from "./components/Navbar";
import Link from "next/link";

// FIREBASE
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

import { MapComponent } from "./components/MapComponent";

const Home = () => {
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
      }
    };

    if (loading) return;
    if (!user) {
      return;
    }
    fetchUserName();
  }, [user, loading]);

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Navbar />
      <div className="flex flex-col z-10 min-h-screen items-center p-8 sm:p-15 lg:p-28">
        <div className="flex flex-row w-full items-center justify-between">
          <div className="flex flex-col items-center font">
            <div className="flex flex-col items-start w-[252.05px] sm:w-[380px] lg:w-[504.1px]">
              {/* greeting */}
              {user ? (
                <span className="text-2xl sm:text-4xl lg:text-5xl mb-10">
                  <p className="font-eina font-bold">Hello, {name}</p>
                </span>
              ) : null}
              <span className="text-2xl sm:text-4xl lg:text-5xl">
                <p className="font-eina font-bold">
                  Schedule with ease,<br></br>smile with confidence
                </p>
              </span>
              <p className="font-eina font-bold text-xl sm:text-3xl lg:text-4xl mt-5">
                book{" "}
                <Link
                  className="group text-[#61B7DB] transition-all duration-300 ease-in-out"
                  href="/booking"
                >
                  <span className="bg-left-bottom bg-gradient-to-r from-[#004D70] to-[#004D70] bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                    now
                  </span>
                </Link>
              </p>
            </div>
          </div>
          <div className="hidden sm:block object-contain">
            <Image
              src="/images/landing-svg.svg"
              alt="Dentist Tools"
              width={493}
              height={401}
              priority
            />
          </div>
        </div>
        <div className="w-full">
          <h1 className="font-eina font-bold text-2xl sm:text-4xl lg:text-5xl mt-24 mb-4">
            Map
          </h1>
          <MapComponent />
        </div>
        <Faq />
      </div>
    </main>
  );
};
//class="flex min-h-screen flex-col items-center justify-between p-24"

export default Home;
