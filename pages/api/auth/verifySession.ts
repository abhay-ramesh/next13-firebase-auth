// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { DecodedIdToken } from "firebase-admin/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import { adminAuth } from "../../../lib/firebase/admin/adminAuth";

export type VerifiedResponse = {
  user: DecodedIdToken | undefined;
  error: unknown | undefined;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<VerifiedResponse>
) {
  const sessionCookie = req.body.sessionCookie || "";
  try {
    const user = await adminAuth.verifySessionCookie(sessionCookie, true);
    res.status(200).json({ user: user, error: undefined });
  } catch (error: unknown) {
    res.status(401).json({ user: undefined, error: error });
  }
}
