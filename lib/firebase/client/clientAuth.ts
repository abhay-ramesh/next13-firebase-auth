import { getAuth, setPersistence } from "firebase/auth";
import { clientApp } from "./firebaseConfig";

// Initialize Firebase Authentication and get a reference to the service
var clientAuth = getAuth(clientApp);
// As httpOnly cookies are to be used, do not persist any state client side.
// setPersistence(clientAuth, 'NONE');

export { clientAuth };