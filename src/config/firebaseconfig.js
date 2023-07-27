// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getAuth} from "firebase/auth";
import { getDatabase } from "firebase/database";
import {getStorage} from "firebase/storage";
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

const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app);
export {app,auth,database,storage};
