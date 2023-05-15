import { initializeApp } from "firebase/app";

const firebaseConfig = {
  databaseURL:
    "https://gatherd-test-default-rtdb.asia-southeast1.firebasedatabase.app/",
  storageBucket: "gs://gatherd-test.appspot.com",
};

export const app = initializeApp(firebaseConfig);
