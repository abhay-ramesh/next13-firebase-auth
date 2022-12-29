import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { cookies } from "next/headers";
import { adminAuth } from "../firebase/admin/adminAuth";

/**
 * @description This function is used to get the user by the session cookie
 * on the server side. It is to be used only on the server side.
 * !This function is not to be used on the client side or API routes.
 * @returns {Promise<DecodedIdToken | null>} The user object or null
 */
async function getUserBySessionCookieAdminServerSide(): Promise<DecodedIdToken | null> {
  if (!cookies().has("session")) return null;

  const sessionCookie = cookies().get("session")?.value || "";

  try {
    const user = await adminAuth.verifySessionCookie(sessionCookie, true);
    return user;
  } catch (error: unknown) {
    return null;
  }
}

export { getUserBySessionCookieAdminServerSide };
