import { NextApiRequest } from 'next'

export type NextApiRequestWithRawBody = NextApiRequest & {
  rawBody: Buffer
}
