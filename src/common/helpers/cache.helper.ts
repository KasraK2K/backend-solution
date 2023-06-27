/* ------------------------------ Dependencies ------------------------------ */
import { NextFunction, Request, Response } from 'express'
import NodeCache from 'node-cache'
// import _ from 'lodash'
/* -------------------------------------------------------------------------- */

const cache = new NodeCache()

/**
 * Catch response using `req.originalUrl` as a cach key
 *
 * @param {number} duration(seconds)
 */
const responseCache = (duration: number) => (req: Request, res: Response, next: NextFunction) => {
  if (req.method !== 'GET') return next()

  const key = req.originalUrl

  // TODO : In other kind of request we can change our key to handle changing body
  // const ip = req.socket.remoteAddress
  // const url = req.originalUrl
  // const body = req.body
  // const key =
  //   body && Object.keys(body).length ? `${url}--${JSON.stringify(_.entries(body).sort())}` : url

  const cacheResponse = cache.get(key)

  if (cacheResponse) {
    return res.send(cacheResponse)
  } else {
    res.originalSend = res.send
    res.send = (body: string): any => {
      cache.set(key, body, duration)
      return res.originalSend(body)
    }
    next()
  }
}

export default responseCache
