import bodyParser from 'body-parser'
import { NextApiRequestWithRawBody } from '../types'

// Body-parser middleware
// - include raw body in request
const parseJsonWithRawBody = bodyParser.json({
  verify: (req: NextApiRequestWithRawBody, _, buf) => {
    req.rawBody = buf
  }
})

export default parseJsonWithRawBody
