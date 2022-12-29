// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { randomBytes } from 'crypto';
import type { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from '../../../lib/api/cookies';

interface Data {
    csrfToken: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    // If no csrfToken cookie is present, set one.
    if (!req.cookies.csrfToken) {
        const csrfToken = randomBytes(32).toString('hex');
        // Generate a secure, httponly cookie with a 32 byte random string as its value.
        setCookie(res, 'csrfToken', csrfToken, {
            maxAge: 60 * 60 * 24 * 365, // 1 year
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            });
        // console.log('Generated csrfToken: ', csrfToken);
        res.status(200).json({ csrfToken })
    } else {
        // console.log('csrfToken already exists: ', req.cookies.csrfToken);
        res.status(200).json({ csrfToken: req.cookies.csrfToken })
    }
}
