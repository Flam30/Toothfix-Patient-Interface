import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence,
} from "firebase/auth";

import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";

import { useRouter } from 'next/router';

import { firebaseConfig } from '../../config/firebaseApp.config';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let rememberMe: boolean = false;

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    applyPersistence();

    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
  }
};

function setPersistenceLocal() {
  rememberMe = true;
}

function setPersistenceSession() {
  rememberMe = false;
}

function applyPersistence() {
  if (rememberMe) {
    setPersistence(auth, browserLocalPersistence);
  } else {
    setPersistence(auth, browserSessionPersistence);
  }
}

const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
      applyPersistence();
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      throw err;
    }
};

const registerWithEmailAndPassword = async (name: string, email: string, password: string) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      });
    } catch (err) {
      console.error(err);
    }
};

const sendPasswordReset = async (email: string) => {
    try {
      return await sendPasswordResetEmail(auth, email);
    } catch (err) {
      console.error(err);
    }
};

const logout = () => {
    signOut(auth);
};

export {
    auth,
    db,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
    setPersistenceLocal,
    setPersistenceSession,
};