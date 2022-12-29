// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getAuth } from 'firebase-admin/auth'
import type { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from '../../../lib/api/cookies'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const uid = req.body.uid
  console.log("🚀 ~ file: signout.ts:16 ~ handler ~ uid", uid)
  
  // Sign out user
  await getAuth().revokeRefreshTokens(req.body.uid)
  // Sign out the user by destroying the session cookie
  // setCookie(res, 'session', '', {
  //   maxAge: -1,
  //   path: '/',
  //   expires: new Date(0),
  //   })

  // Remove the session cookie
  // res.setHeader('Set-Cookie', [
  //   `session
  //   =; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`,
  // ])
}
