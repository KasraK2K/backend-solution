/* ------------------------------ Dependencies ------------------------------ */
import { Request, Response, NextFunction } from 'express'
import config from 'config'
import _ from 'lodash'
/* ----------------------------- Custom Modules ----------------------------- */
import Middleware from '../base/Middleware'
import { IApplicationConfig } from '../../config/config.interface'
import errorHandler from '../common/helpers/error/error.handler'
/* -------------------------------------------------------------------------- */

const applicationConfig: IApplicationConfig = config.get('application')
const mode: string = config.get('mode')

class RequestMiddleware extends Middleware {
  processIdAdder(req: Request, res: Response, next: NextFunction) {
    const process_id = (+new Date() + Math.floor(Math.random() * (999 - 100) + 100)).toString(16)
    // _.assign(global, { process_id })
    // _.assign(res.locals, { params: { process_id } })
    req.process_id = process_id
    next()
  }

  public isMethodAllowed(req: Request, res: Response, next: NextFunction) {
    const endpoint = req.originalUrl
    const routerVersion = applicationConfig.router_version
    const allowMethods = applicationConfig.request.allowMethods
    const ignoreCheckMethod: string[] = applicationConfig.request.ignoreCheckMethods
    const checkMethod = !ignoreCheckMethod.some((ignoreEndpoint) =>
      endpoint.includes(`/${routerVersion}/${ignoreEndpoint}`)
    )

    if (
      allowMethods.length &&
      !allowMethods.includes('*') &&
      checkMethod &&
      !allowMethods.includes(req.method)
    ) {
      const error = errorHandler(1014)
      return res.status(error.status).json({
        api_version: applicationConfig.api_version,
        front_version: applicationConfig.front_version,
        portal_version: applicationConfig.portal_version,
        endpoint: req.originalUrl,
        env: String(process.env.NODE_ENV),
        mode,
        error,
      })
    }
    next()
  }
}

export default new RequestMiddleware()
