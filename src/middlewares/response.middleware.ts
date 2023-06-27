/* ------------------------------ Dependencies ------------------------------ */
import { Request, Response, NextFunction } from 'express'
/* ----------------------------- Custom Modules ----------------------------- */
import Middleware from '../base/Middleware'
import restResponseTimeHistogram from '../integrations/prometheus/metrics'
/* -------------------------------------------------------------------------- */

class ResponseMiddleware extends Middleware {
  calculateTime(req: Request, res: Response, time: number) {
    if (req.route?.path) {
      console.log(time)
      restResponseTimeHistogram.observe(
        {
          business_name: process.env.BUSINESS_NAME,
          app_name: process.env.APP_NAME,
          method: req.method,
          route: req.route.path,
          status_code: res.statusCode,
        },
        time
      )
    }
  }
}

export default new ResponseMiddleware()
