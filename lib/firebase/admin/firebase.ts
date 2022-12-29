import {
  initializeApp,
  type ServiceAccount,
  cert,
  getApps,
  App,
} from "firebase-admin/app";
import { FirebaseApp } from "firebase/app";
import serviceAccountKey from "../../../firebase.json";

// const firebaseConfig = {
//     apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//     authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
//     measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
// };

const serviceAccount: ServiceAccount = serviceAccountKey as ServiceAccount;

var adminApp: App | undefined = undefined;

if (getApps().length === 0) {
  adminApp = initializeApp(
    {
      credential: cert(serviceAccount),
    },
    "admin"
  );
} else {
  adminApp = getApps()[0];
  // console.log("Firebase already initialized");
}

export { adminApp };
