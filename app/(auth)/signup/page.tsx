"use client";
// Create React Component for Signup using firebase authentication
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import GoogleOneTap from "../../../components/GoogleOneTap";
import { getCsrfToken } from "../../../lib/client/getCsrfToken";
import { clientAuth } from "../../../lib/firebase/client/clientAuth";

const provider = new GoogleAuthProvider();

export default function SignUpComp() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Handle Email Password Signup
  const handleSignup = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (password !== passwordConfirm) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }
    // Get csrfToken from cookie
    const csrfToken = await getCsrfToken();

    createUserWithEmailAndPassword(clientAuth, email, password)
      .then((result) => {
        // User is signed in. Get the ID token.
        return result.user.getIdToken();
      })
      .then((idToken) => {
        // Pass the ID token to the server.
        // Send token to your backend via HTTPS to /sessionLogin

        console.log("idToken", idToken);
        console.log("csrfToken", JSON.stringify(csrfToken));
        const url = "/api/auth/sessionLogin";
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ idToken, csrfToken }),
        };
        fetch(url, options)
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          });
        // clear form
        setEmail("");
        setPassword("");
        setPasswordConfirm("");
        setLoading(false);
        // Redirect to Dashboard
        router.push("/dashboard");
      })
      .catch((error) => {
        // Handle error.
        setError(String(error.message).split("/")[1].replace(")", ""));
        setLoading(false);
      });
  };

  return (
    <>
      <h1 className="mt-4 text-4xl font-bold text-center text-white">Signup</h1>
      <form className="flex flex-col justify-center py-6 sm:px-6 ">
        <div className="flex flex-col w-full px-0 pt-6 space-y-2">
          <input type="hidden" name="csrfToken" value="csrfToken" />
          <label
            className="text-sm font-bold text-left text-white"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="px-4 py-2 text-sm font-bold text-left text-gray-700 border border-white rounded-lg focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:shadow-none"
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label
            className="text-sm font-bold text-left text-white"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="px-4 py-2 text-sm font-bold text-left text-gray-700 border border-white rounded-lg focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:shadow-none"
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="Password"
            minLength={8}
            // aria-describedby="password-constraints"
            pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            // To check a password above 8 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character
            title="Must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character and be at least 8 characters long"
          />
          {/* <div id="password-constraints">
            Must contain at least one lowercase letter, one uppercase letter,
            one numeric digit, and one special character and be at least 8
            characters long.
          </div> */}
          <label
            className="text-sm font-bold text-left text-white"
            htmlFor="confirm-password"
          >
            Confirm Password
          </label>
          <input
            className={
              "border border-white rounded-lg px-4 py-2 text-sm font-bold text-left text-gray-700 focus:outline-none" +
              (password !== passwordConfirm && passwordConfirm.length > 0
                ? " border-pink-500 text-pink-600"
                : " focus:border-sky-500 focus:ring-2 focus:ring-sky-500")
            }
            id="confirm-password"
            name="confirm-password"
            type="password"
            autoComplete="new-password"
            placeholder="Confirm Password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col justify-between w-full px-0 py-6 space-y-2 ">
          <button
            type="submit"
            className="px-4 py-2 mt-1 text-sm font-bold text-center text-black bg-white border border-white rounded-lg"
            onClick={(e) => handleSignup(e)}
          >
            Signup
          </button>
          <GoogleOneTap showButton={true} />
        </div>
        <p className="text-sm text-center text-white">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="text-sm font-bold text-center text-white underline"
          >
            Login
          </Link>
        </p>
        {error && (
          <p className="mt-2 -mb-4 text-sm text-center text-red-500 ">
            {error}
          </p>
        )}
      </form>
    </>
  );
}
