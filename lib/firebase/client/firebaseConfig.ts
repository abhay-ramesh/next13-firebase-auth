// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth } from "firebase/auth";
import { getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// console.log("firebaseClientApps: ", getApps());

var clientApp: FirebaseApp | undefined = undefined;
if (getApps().length === 0) {
  console.log("Initializing Firebase");
  // Initialize Firebase
  clientApp = initializeApp(firebaseConfig, "client");
  // Initialize Firebase Analytics
  if (typeof window !== "undefined") {
    if ("measurementId" in firebaseConfig) {
      getAnalytics(clientApp);
    }
  }
} else {
  // console.log("Firebase already initialized");
  clientApp = getApps()[0];
}

export { clientApp };
