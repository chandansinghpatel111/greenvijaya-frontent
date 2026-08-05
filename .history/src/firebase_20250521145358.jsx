// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  // apiKey: "AIzaSyB4WPlPAnBjO4aOPAKdtxJw92FUWkYCHL8",
  // authDomain: "usdunique-e0984.firebaseapp.com",
  // projectId: "usdunique-e0984",
  // storageBucket: "usdunique-e0984.firebasestorage.app",
  // messagingSenderId: "691751758465",
  // appId: "1:691751758465:web:15d8751853e0a2b7e7fb80",
  // measurementId: "G-1N684EVKPY",
  // databaseURL: "https://console.firebase.google.com/project/usdunique-e0984/database/usdunique-e0984-default-rtdb/data/~2F",
  apiKey: "AIzaSyCQd3EDieasn95NlvI7dFcl2q5YoJHN1Og",
  authDomain: "usdinfra-a11c2.firebaseapp.com",
  databaseURL: "https://usdinfra-a11c2-default-rtdb.firebaseio.com",
  projectId: "usdinfra-a11c2",
  storageBucket: "usdinfra-a11c2.firebasestorage.app",
  messagingSenderId: "654393750018",
  appId: "1:654393750018:web:e31e34f5a9f76226f7ed1b",
  measurementId: "G-3P88VYSE9M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// const storage = getStorage(app);



const storage = getStorage(app);

export { db, auth, storage };
export const USDinfra = getStorage(app)