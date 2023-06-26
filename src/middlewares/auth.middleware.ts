/* ------------------------------ Dependencies ------------------------------ */
import { Request, Response, NextFunction } from 'express'
import config from 'config'
/* ----------------------------- Custom Modules ----------------------------- */
import { IApplicationConfig } from '../../config/config.interface'
import Middleware from '../base/Middleware'
import tokenHelper from '../common/helpers/token.helper'
import jwtUtil from '../common/utils/jwt.util'
import errorHandler from '../common/helpers/error/error.handler'
/* -------------------------------------------------------------------------- */

const applicationConfig: IApplicationConfig = config.get('application')
const mode: string = config.get('mode')

class AuthMiddleware extends Middleware {
  public auth(req: Request, res: Response, next: NextFunction) {
    const endpoint = req.originalUrl
    const routerVersion = applicationConfig.router_version
    const ignoreToken: string[] = applicationConfig.request.ignoreToken
    const ignoreApikeys: string[] = applicationConfig.request.ignoreApiKey
    const responseAdditational = {
      api_version: applicationConfig.api_version,
      front_version: applicationConfig.front_version,
      portal_version: applicationConfig.portal_version,
      endpoint: req.originalUrl,
      env: String(process.env.NODE_ENV),
      mode,
      error: undefined,
    }

    const checkToken = ignoreToken.includes('*')
      ? false
      : !ignoreToken.some((ignoreToken) => endpoint.includes(`/${routerVersion}/${ignoreToken}`))

    const checkApiKey = ignoreApikeys.includes('*')
      ? false
      : !ignoreApikeys.some((ignoreApiKey) =>
          endpoint.includes(`/${routerVersion}/${ignoreApiKey}`)
        )

    /* ------------------------------ Check API_KEY ----------------------------- */
    if (checkApiKey) {
      const api_key = req.headers[applicationConfig.apiKeyHeader] as string
      if (!api_key) {
        const error = errorHandler(1012)
        return res.status(error.status).json({ ...responseAdditational, error })
      }

      const { valid, data: _data } = tokenHelper.verify(api_key)
      if (!valid) {
        const error = errorHandler(1013)
        return res.status(error.status).json({ ...responseAdditational, error })
      }
    }

    /* ------------------------------- Check Token ------------------------------ */
    if (checkToken) {
      // REVIEW : Why token type is in req.body. Everything about token should be in to the token not request
      const tokenType = req.body?.token_type ? req.body.token_type : ''

      let cypherToken = req.headers[applicationConfig.bearerHeader] as string
      if (cypherToken && cypherToken.startsWith(`${applicationConfig.bearer} `)) {
        cypherToken = cypherToken.slice(applicationConfig.bearer.length + 1)

        const { valid, data } = tokenHelper.verify(cypherToken)
        if (!valid) {
          const error = errorHandler(1010)
          return res.status(error.status).json({ ...responseAdditational, error })
        } else res.locals.tokenData = data
      } else {
        const error = errorHandler(1011)
        return res.status(error.status).json({ ...responseAdditational, error })
      }
    }
    /* -------------------------------------------------------------------------- */

    next()
  }
}

export default new AuthMiddleware()
