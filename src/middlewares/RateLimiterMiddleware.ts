/* ------------------------------ Dependencies ------------------------------ */
import rateLimit from 'express-rate-limit'
import { Request, Response } from 'express'
import config from 'config'
/* ----------------------------- Custom Modules ----------------------------- */
import { IApplicationConfig, IRateLimiter } from '../../config/config.interface'
import Middleware from '../base/Middleware'
import errorHandler from 'src/common/helpers/error/error.handler'
/* -------------------------------------------------------------------------- */

const reateLimiterConfig: IRateLimiter = config.get('rate_limiter')
const applicationConfig: IApplicationConfig = config.get('application')
const mode: string = config.get('mode')

class RateLimiterMiddleware extends Middleware {
  public check() {
    return rateLimit({
      windowMs: reateLimiterConfig.windowMs, // 1 minutes
      max: reateLimiterConfig.max, // limit each IP to 100 requests per 1 minutes
      standardHeaders: reateLimiterConfig.standardHeaders, // Return rate limit info in the `RateLimit-*` headers
      legacyHeaders: reateLimiterConfig.legacyHeaders, // Disable the `X-RateLimit-*` headers
      handler: (req: Request, res: Response) => {
        const error = errorHandler(1003)
        return res.status(error.status).json({
          api_version: applicationConfig.api_version,
          front_version: applicationConfig.front_version,
          portal_version: applicationConfig.portal_version,
          endpoint: req.originalUrl,
          env: String(process.env.NODE_ENV),
          mode,
          error,
        })
      },
    })
  }
}

export default new RateLimiterMiddleware()
