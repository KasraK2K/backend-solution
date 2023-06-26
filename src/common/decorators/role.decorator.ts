/* ------------------------------ Dependencies ------------------------------ */
import { Request } from 'express'
import config from 'config'
/* ------------------------------ Node Modules ------------------------------ */
import { addMetaDataLogic } from '../helpers/addMetaData.helper'
import errorHandler from '../helpers/error/error.handler'
/* -------------------------------------------------------------------------- */

const bearerKey: string = config.get('application.bearer')
const bearerHeader: string = config.get('application.bearerHeader')

const Role = (roles: string[]) => {
  return (_target: Object, _prototypeKey: string, descriptor: PropertyDescriptor) => {
    const originalValue = descriptor.value

    descriptor.value = function (...args: any[]) {
      const res = args[0].res
      const originalUrl = args[0].originalUrl
      const headers: string[] = Array.from(args[0].rawHeaders)
      const additational = addMetaDataLogic({ originalUrl } as Request)

      let token: string | string[] = headers.filter((header) => header.startsWith(bearerKey))

      // Cheack Authorization Heaer
      if (!token || !token.length || !headers.includes(bearerHeader)) {
        const error = errorHandler(401)
        return res.status(error.status).json({ ...additational, error })
      }
      // Check Token & Role
      else {
        token = token[0].slice(bearerKey.length + 1)
        const tokenRole = 'user' // FIXME : Extract from token
        // Check role is valid
        if (!roles.includes(tokenRole)) {
          const error = errorHandler(403)
          return res.status(error.status).json({ ...additational, error })
        }
      }

      return originalValue.apply(this, args)
    }
  }
}

export default Role
