import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import dotenv from "dotenv";

const firebaseConfig = {};

// Initialize Firebase and export the app instance
export const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export const storage = getStorage(app);
