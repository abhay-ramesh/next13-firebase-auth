"use client";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { clientAuth } from "../lib/firebase/client/clientAuth";

const provider = new GoogleAuthProvider();

interface GoogleLoginButtonProps {
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
  router: AppRouterInstance;
}

/**
 * @deprecated GoogleLoginButton will be removed in the future Use GoogleOneTap instead, which is more user friendly
 * @param setError
 * @param setLoading
 * @param router
 * @returns Custom Firebase Based Google Sign-in Button
 */
function GoogleLoginButton({
  setError,
  setLoading,
  router,
}: GoogleLoginButtonProps): JSX.Element {
  // Custom Google Sign-in Button
  // Handle Google Login
  const handleGoogleLogin = async () => {
    setError(null);
    setLoading(true);
    // Get csrfToken from cookie
    const csrfToken = await fetch("/api/auth/csrfToken").then((res) =>
      res.json()
    );
    signInWithPopup(clientAuth, provider)
      .then((result) => {
        // Get the user's ID token as it is needed to exchange for a session cookie.
        return result.user.getIdToken();
      })
      .then((idToken) => {
        // Pass the ID token to the server.
        // Send token to your backend via HTTPS to /sessionLogin
        console.log("idToken", idToken);
        console.log("csrfToken", csrfToken);
        const url = "/api/auth/sessionLogin";
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken,
            csrfToken,
          }),
        };
        fetch(url, options)
          .then((res) => res.json())
          .then((data) => {
            console.log("data", data);
          });
        setLoading(false);
        // client side redirect
        router.push("/dashboard");
      })
      .catch((error) => {
        // Handle error
        setError(error.message);
        setLoading(false);
      });
  };

  return (
    <button
      className="flex flex-row items-center justify-center px-4 py-2 text-sm font-bold text-center text-black bg-white border border-white rounded-[4px]"
      onClick={() => handleGoogleLogin()}
    >
      <img
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
        alt="Google"
        className="w-6 h-6 mr-2"
      />
      Login with Google
    </button>
  );
}

export default GoogleLoginButton;
