"use client";

import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useEffect } from "react";
import { getCsrfToken } from "../lib/client/getCsrfToken";
import { clientAuth } from "../lib/firebase/client/clientAuth";

interface GoogleUser {
  clientId: string;
  client_id: string;
  credential: string;
  select_by: string;
}

declare global {
  interface Window {
    handleToken: (googleUser: GoogleUser) => void;
  }
}

/**
 *
 * @param showOneTap - Show Google One Tap @type boolean
 * @param showButton - Show Google Login Button @type boolean
 * @description Google One Tap and Login Button using Google Identity Toolkit with integration with Firebase
 * @returns Initialization of Google One Tap and Login Button
 */
function GoogleOneTap({
  showOneTap,
  showButton = false,
}: {
  showOneTap?: boolean;
  showButton?: boolean;
}) {
  const router = useRouter();
  // Get location pathname
  var pathname = "";
  // TODO: Build handleToken function for Google Sign-In to send firebase idToken to backend
  useEffect(() => {
    // console.log("GoogleOneTap");
    // if (typeof window !== "undefined") {
    window.handleToken = async (googleUser: GoogleUser) => {
      // console.log(googleUser);
      const idToken = googleUser.credential;
      const credential = GoogleAuthProvider.credential(idToken);

      // Sign in with credential from the Google user.
      const googleIdToken = await signInWithCredential(clientAuth, credential)
        .then((UserCredential) => {
          const googleIdToken = UserCredential.user.getIdToken();
          return googleIdToken;
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.email;
          // The credential that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        })
        .finally(() => {});
      // Get CSRF token from fetch request
      const csrfToken = await getCsrfToken();
      const redirectUrl = "/dashboard";
      // Send googleIdToken to backend
      fetch("/api/auth/googleLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ credential: googleIdToken, csrfToken }),
      }).then((res) => {
        if (res.ok) {
          console.log("Success");
          router.push(redirectUrl);
        }
      });
    };
    // }
  }, []);
  return (
    <div>
      {/* This is for Google One Tap Initializing */}
      <div
        id="g_id_onload"
        data-client_id={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID}
        data-context="signin"
        data-ux_mode="popup"
        // data-login_uri={process.env.NEXT_PUBLIC_GOOGLE_AUTH_LOGIN_URI}
        data-callback="handleToken"
        data-itp_support="true"
        data-skip_prompt_cookie="session"
        data-auto_prompt={showOneTap === true && (showButton || showOneTap)}
      />
      {showButton && (
        <div
          // One Tap Google Sign In
          className="mx-auto g_id_signin"
          data-type="standard"
          data-shape="rectangular"
          data-theme="filled_black"
          data-text="signin_with"
          data-size="large"
          data-logo_alignment="left"
          data-width={240}
        />
      )}
      {/* This is for Google One Tap Script */}
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        async
        defer
      />
    </div>
  );
}

export default GoogleOneTap;
