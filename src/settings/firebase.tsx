// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNh6I9K5RRSdRxDnoxdrTw5QYVlSspjQg",
  authDomain: "gatherd-os.firebaseapp.com",
  databaseURL: "https://gatherd-os-default-rtdb.firebaseio.com",
  projectId: "gatherd-os",
  storageBucket: "gatherd-os.appspot.com",
  messagingSenderId: "301526015638",
  appId: "1:301526015638:web:ee4e0da9bd50c9b939acb7",
  measurementId: "G-WSEQ01P6Z5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
