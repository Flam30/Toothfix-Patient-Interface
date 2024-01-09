import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";

// FIREBASE
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../firebase";

import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  updateDoc
} from "firebase/firestore";

const Details: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");

  // MODAL BOOLS
  const [showInputName, setShowInputName  ] = useState(false);

  // MODAL DATA
  const [newName, setNewName] = useState("");

  // NEW NAME
  const updateName = async () => {
    try {
      // update set the name field to the new name
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      await updateDoc(doc.docs[0].ref, {
        name: newName,
      });
      setName(newName);
    } catch (err) {
      console.error(err);
      alert("An error occured while updating your name");
    }
  };

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
          >
            <span className="underline underline-offset-2 decoration-darkaccent lg:no-underline bg-left-bottom bg-gradient-to-r from-darkaccent to-darkaccent bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
              log out
            </span>
          </button>
        </div>
      </div>
      <div className="flex flex-row flex-nowrap justify-between sm:h-[37px] lg:h-[43px] items-baseline w-full">
        <p className="font-eina font-semibold text-xl sm:text-3xl lg:text-4xl h-full truncate text-ellipsis">
          {name}
        </p>
        <button
            className="group font-eina font-bold text-primary opacity-90 text-xl sm:text-xl lg:text-2xl transition-all duration-300 ease-in-out"
            onClick={ () => setShowInputName(true)}
          >
        <p className="underline underline-offset-2 decoration-darkaccent lg:no-underline bg-left-bottom bg-gradient-to-r from-darkaccent to-darkaccent bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
          name
        </p>
        </button>
      </div>
      <div className="flex flex-row flex-nowrap justify-between sm:h-[37px] lg:h-[43px] items-baseline w-full p-0">
        <p className="font-eina font-semibold text-xl sm:text-3xl lg:text-4xl h-full truncate text-ellipsis">
          {user?.email}
        </p>
        <p className="font-eina font-semibold opacity-90 text-xl sm:text-xl lg:text-2xl">
          email
        </p>
      </div>

      {/* input modal NAME */}
      {showInputName ? 
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
                    Edit your name
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowInputName(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  {/* phone input field */}
                  <input
                    type="text"
                    placeholder="John Doe"
                    onChange={(e) => setNewName(e.target.value)}
                    className="border-2 border-gray-300 rounded-md p-2 w-full"
                  />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowInputName(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-green-800 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow outline-none"
                    type="button"
                    onClick={() => {
                      setShowInputName(false);
                      updateName();
                    }}
                  >
                    Change
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </div>
       : null}

    </div>
  );
};

export default Details;
