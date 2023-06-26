/* ------------------------------ Dependencies ------------------------------ */
import { Response } from 'express'
/* ------------------------------ Node Modules ------------------------------ */
import { cache } from '../../common/helpers/cache.helper'
/* -------------------------------------------------------------------------- */

const Cache = (duration: number) => {
  return (_target: Object, _prototypeKey: string, descriptor: PropertyDescriptor) => {
    const originalValue = descriptor.value

    descriptor.value = function (...args: any[]) {
      const res: Response = args[0].res

      if (args[0].method !== 'GET') return originalValue.apply(this, args)

      const key = args[0].originalUrl
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
