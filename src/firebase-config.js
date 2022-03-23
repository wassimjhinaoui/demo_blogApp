import { initializeApp } from "firebase/app";
import {GoogleAuthProvider,getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyA-80jzPRjS0UWpCXuB_BGZqEjEgQLhD48",
  authDomain: "testigandtraining.firebaseapp.com",
  projectId: "testigandtraining",
  storageBucket: "testigandtraining.appspot.com",
  messagingSenderId: "711724354736",
  appId: "1:711724354736:web:34815b69e48cae1f80bf75"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
