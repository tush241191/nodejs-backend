import {Response} from 'express'

import Log from '../middlewares/Log'
import { errorPayload } from '../interfaces/exception'

class ResourceHandler {
  public static badRequest(res, payload: errorPayload): Response {
    Log.error('Bad request', {payload})

    return res
      .status(400)
      .send(payload)
  }

  public static notFound(res, payload: errorPayload): Response {
    Log.error('Resource not found')

    return res
      .status(404)
      .send(payload)
  }
}

export default ResourceHandler
