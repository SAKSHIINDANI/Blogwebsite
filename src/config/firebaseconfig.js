// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
  const firebaseConfig = {
  apiKey: "AIzaSyAZZU0KANy8XXYuTYlSsV6le6GOpg5fmVA",
  authDomain: "blogwebsite-4e44e.firebaseapp.com",
  projectId: "blogwebsite-4e44e",
  storageBucket: "blogwebsite-4e44e.appspot.com",
  messagingSenderId: "960649019898",
  appId: "1:960649019898:web:ba733ad7262bf7d0e5e443",
  measurementId: "G-M7N49J8LBR",
  databaseURL: "https://blogwebsite-4e44e-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);
export {app,auth,database};
