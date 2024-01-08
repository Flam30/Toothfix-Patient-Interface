import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";

// FIREBASE
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

const Bookings: React.FC = () => {
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
    <div className="flex flex-col w-full mt-8">
      <h1 className="font-eina font-bold mb-5 text-3xl sm:text-4xl lg:text-5xl">
        Bookings
      </h1>
      <div className="hidden sm:flex flex-row flex-nowrap items-center justify-between px-2 w-full h-[47px] bg-[#d4ecf7] font-eina font-semibold text:xl lg:text-2xl">
        <div className="flex flex-row flex-nowrap shrink-0">
          {"11:30 - 12:00"}
          <span className="mx-1 lg:mx-2 opacity-80">on</span>
          {"12/12/2023"}
          <span className="mx-1 lg:mx-2 opacity-80">at</span>
          <p className="truncate text-ellipsis max-w-[210px] lg:max-w-[340px]">
            {"Summerbloom Dental Office"}
          </p>
          <span className="mx-1 lg:mx-2 opacity-80">w/</span>
          <p className="truncate text-ellipsis max-w-[113px] lg:max-w-[260px]">
            {"J. Smithsoniannnnnnnnnnnn"}
          </p>
        </div>
        <div>
          <button
            className="group transition-all duration-300 ease-in-out"
            onClick={logout}
          >
            <span className="underline lg:no-underline underline-offset-1 bg-left-bottom bg-gradient-to-r from-text to-text bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
              cancel
            </span>
          </button>
        </div>
      </div>
      <div className="sm:hidden flex flex-col items-start px-1 w-full bg-[#d4ecf7] font-eina font-semibold">
        <div className="flex flex-row flex-nowrap">
          {"11:30 - 12:00"}
          <span className="mx-1 opacity-80">on</span>
          {"12/12/2023"}
        </div>
        <div className="flex flex-row flex-nowrap">
          <span className="mr-1 opacity-80">at</span>
          <p className="truncate text-ellipsis max-w-[350px]">
            {"Summerbloom Dental Office"}
          </p>
        </div>
        <div className="flex flex-row flex-nowrap justify-between w-full">
          <div className="flex flex-row flex-nowrap">
            <span className="mr-1 opacity-80">w/</span>
            <p className="truncate text-ellipsis max-w-[250px]">
              {"J. Smithsoniannnnnnnnnnnnnnnn"}
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
  );
};

export default Bookings;
