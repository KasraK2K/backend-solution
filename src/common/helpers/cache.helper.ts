/* ------------------------------ Dependencies ------------------------------ */
import { NextFunction, Request, Response } from 'express'
import NodeCache from 'node-cache'
/* -------------------------------------------------------------------------- */

export const cache = new NodeCache()

/**
 * Catch response using `req.originalUrl` as a cach key
 *
 * @param {number} duration(seconds)
 */
const responseCache = (duration: number) => (req: Request, res: Response, next: NextFunction) => {
  if (req.method !== 'GET') return next()

  const key = req.originalUrl
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
