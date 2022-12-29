"use client";
// Create React Component for Login using firebase authentication
import { signInWithEmailAndPassword } from "firebase/auth";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";
import GoogleOneTap from "../../../components/GoogleOneTap";
import { getCsrfToken } from "../../../lib/client/getCsrfToken";
import { clientAuth } from "../../../lib/firebase/client/clientAuth";

export default function LoginComp() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Handle Email Password Login
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    // Get csrfToken from cookie
    const csrfToken = await getCsrfToken();

    // Get email and password from form
    const email = (e.target as HTMLFormElement).email.value;
    const password = (e.target as HTMLFormElement).password.value;

    signInWithEmailAndPassword(clientAuth, email, password)
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
    <>
      <h1 className="mt-4 text-4xl font-bold text-center text-white">Login</h1>
      <form
        onSubmit={(e) => handleLogin(e)}
        className="flex flex-col justify-center py-6 sm:px-6 "
      >
        <div className="flex flex-col w-full px-0 pt-6 space-y-2">
          <GoogleOneTap showButton={true} />
          {/* 
          <text className="mx-auto text-center text-white align-middle ">
            -------------- OR --------------
          </text> */}
          <label
            htmlFor="email"
            className="text-sm font-bold text-left text-white"
          >
            Email
          </label>
          <input
            className="px-4 py-2 text-sm font-bold text-left text-gray-700 border border-white rounded-lg"
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Email"
            required
          />
          <label
            htmlFor="password"
            className="text-sm font-bold text-left text-white"
          >
            Password
          </label>
          <input
            className="px-4 py-2 text-sm font-bold text-left text-gray-700 border border-white rounded-lg"
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Password"
            required
          />
        </div>
        <div className="flex flex-col justify-between w-full py-6 space-y-2 ">
          <button
            type="submit"
            className="bg-white border mt-1 border-white rounded-[4px] px-4 py-2 text-black text-sm font-bold text-center"
          >
            Login
          </button>
        </div>

        <p className="text-sm text-center text-white">
          Don't have an account?{" "}
          <Link href="/signup" className="text-sm text-center text-white">
            Sign up
          </Link>
        </p>

        <p className="text-sm text-center text-white">
          Forgot your password?{" "}
          <Link
            href="/reset-password"
            className="text-sm text-center text-white"
          >
            Reset Password
          </Link>
        </p>
        {error && (
          <p className="mt-2 -mb-4 text-sm text-center text-red-500">{error}</p>
        )}
      </form>
    </>
  );
}
