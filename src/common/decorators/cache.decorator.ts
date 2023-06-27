/* ------------------------------ Dependencies ------------------------------ */
import { Request, Response } from 'express'
import NodeCache from 'node-cache'
// import _ from 'lodash'
/* -------------------------------------------------------------------------- */

const cache = new NodeCache()

const Cache = (duration: number) => {
  return (_target: Object, _prototypeKey: string, descriptor: PropertyDescriptor) => {
    const originalValue = descriptor.value

    descriptor.value = function (...args: any[]) {
      const res: Response = args[0].res
      const req: Request = args[1].req

      if (req.method !== 'GET') return originalValue.apply(this, args)

      const key = req.originalUrl

      // TODO : In other kind of request we can change our key to handle changing body
      // const ip = req.socket.remoteAddress
      // const url = req.originalUrl
      // const body = req.body
      // const key =
      //   body && Object.keys(body).length ? `${url}--${JSON.stringify(_.entries(body).sort())}` : url

      const cacheResponse: string = cache.get(key) as string
      if (cacheResponse) {
        return res.set('Cache-Control', `public, max-age=${duration}`).send(cacheResponse)
      } else {
        res.originalSend = res.send
        res.send = (body: string): any => {
          cache.set(key, body, duration)
          return res.originalSend(body)
        }
        return originalValue.apply(this, args)
      }
    }
  }
}

export default Cache
