'use client';

import React, {useState, useEffect} from 'react'

// ROUTING AND LINKING
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// FIREBASE
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

// AXIOS
import axios from "axios";
const API_URL = "http://localhost:3005";

let clinics = [
  {
    name: "Clinic 1",
    id: "clinic1",
  },
]

export default function ClinicSelect() {
    const router = useRouter();
    
    const [user, loading, error] = useAuthState(auth);
    const [dentistActive, setDentistActive] = useState(false);

    // array of clinics
    const [clinics, setClinics] = useState<any[]>([]);
    // array of dentists
    const [dentists, setDentists] = useState<any[]>([]);
    // array of filtered dentists
    const [filteredDentists, setFilteredDentists] = useState(dentists);

    const [selectedClinic, setSelectedClinic] = useState("");
    const [selectedDentist, setSelectedDentist] = useState("");

    // Redirect if not logged in
    useEffect(() => {
        // fetch the clinics and dentists from the API gateway
        function fetchClinics() {
            // fetch the clinics
            axios.get(`${API_URL}/booking/clinics`)
            .then((res) => {
            setClinics(res.data);
            }).catch((err) => {
            console.log(err);
            });
        }
        function fetchDentists() {
            // fetch the dentists
            axios.get(`${API_URL}/booking/dentists`)
            .then((res) => {
            setDentists(res.data);
            }).catch((err) => {
            console.log(err);
            });
        }

        if(loading) return;
        if(!user) { 
        router.push('/login');
        return; 
        }

        fetchClinics();
        fetchDentists();

    }, [user, loading, router]);

    // when the clinic is selected
    function handleClinicChange(e: any) {
        setSelectedClinic(e.target.value);
        setDentistActive(true);

        // filter the dentists based on the clinic
        setFilteredDentists(dentists.filter(dentist => dentist.clinic === e.target.value));
    }

    return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md">
        <form className="bg-white dark:bg-slate-700 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
            <label htmlFor="clinics" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select a clinic</label>
            <select onChange={handleClinicChange} id="clinics" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option selected>Choose a clinic</option>
            {clinics.map((clinic) => (
                <option key={clinic._id} value={clinic._id}>{clinic.name}</option>
            ))}
            </select>
        </div>
        <div className="mb-4">
            <label htmlFor='dentists' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select a dentist</label>
            {/* if no clinic is selected, disable */}
            {/* only show dentists that are in the selected clinic */}
            <select id="dentists" disabled={!dentistActive} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option selected>Choose a dentist</option>
            {filteredDentists.map((dentist) => (
                <option key={dentist.personnummer} value={dentist.personnummer}>{dentist.name}</option>
            ))}
            </select>
        </div>
            <div className="flex items-center justify-between">
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                
            >
                Select
            </button>
            </div>
        </form>
        </div>
    </div>
    )
}
