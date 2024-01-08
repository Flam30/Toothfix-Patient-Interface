import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";

// FIREBASE
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

const Details: React.FC = () => {
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
    <div className="flex flex-col w-full">
      <div className="flex flex-row justify-between items-baseline w-full p-0">
        <h1 className="font-eina font-bold mb-5 text-3xl sm:text-4xl lg:text-5xl">
          Details
        </h1>
        <div className="mt-10">
          <button
            className="group font-eina font-bold text-primary opacity-90 text-xl sm:text-xl lg:text-2xl transition-all duration-300 ease-in-out"
            onClick={logout}
            // className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            <span className="underline underline-offset-2 decoration-darkaccent lg:no-underline bg-left-bottom bg-gradient-to-r from-darkaccent to-darkaccent bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
              log out?
            </span>
          </button>
        </div>
      </div>
      <div className="flex flex-row flex-nowrap justify-between items-baseline w-full p-0">
        <p className="font-eina font-semibold text-xl sm:text-3xl lg:text-4xl truncate text-ellipsis">
          {name}
        </p>
        <p className="font-eina font-semibold opacity-90 text-xl sm:text-xl lg:text-2xl underline underline-offset-2 decoration-1 lg:no-underline">
          name
        </p>
      </div>
      <div className="flex flex-row flex-nowrap justify-between items-baseline w-full p-0">
        <p className="font-eina font-semibold text-xl sm:text-3xl lg:text-4xl truncate text-ellipsis">
          {user?.email}
        </p>
        <p className="font-eina font-semibold opacity-90 text-xl sm:text-xl lg:text-2xl">
          email
        </p>
      </div>
      <div className="flex flex-row flex-nowrap justify-between items-baseline w-full p-0">
        <p className="font-eina font-semibold text-xl sm:text-3xl lg:text-4xl truncate text-ellipsis">
          +079 123 45 67
        </p>
        <p className="font-eina font-semibold opacity-90 text-xl sm:text-xl lg:text-2xl underline underline-offset-2 decoration-1 lg:no-underline">
          phone number
        </p>
      </div>
      <div className="flex flex-row flex-nowrap justify-between items-baseline w-full p-0">
        <p className="font-eina font-semibold text-xl sm:text-3xl lg:text-4xl truncate text-ellipsis">
          YYYY-MM-DD
        </p>
        <p className="font-eina font-semibold opacity-90 text-xl sm:text-xl lg:text-2xl underline underline-offset-2 decoration-1 lg:no-underline">
          personnumer
        </p>
      </div>
    </div>
  );
};

export default Details;
