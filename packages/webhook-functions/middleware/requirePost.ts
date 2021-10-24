import { NextApiResponse, NextApiRequest } from 'next'

type NextApiRequestWithRawBody = NextApiRequest & {
  rawBody: Buffer
}

/**
 * Only allow POST requests
 *
 * @param req Next.js API request with raw body
 * @param res Next.js API response
 * @param next Middleware function
 * @returns
 */
const requirePost = (
  req: NextApiRequestWithRawBody,
  res: NextApiResponse,
  next: Function
) => {
  if (req.method !== 'POST') {
    return res.status(405).send({ error: 'Method not allowed' })
  }

  next()
}

export default requirePost
