/* ------------------------------ Dependencies ------------------------------ */
import { Request, Response, NextFunction } from 'express'
import passport from 'passport'
/* ----------------------------- Custom Modules ----------------------------- */
import Controller from '../../base/Controller'
import { BindInstance } from '../../common/decorators'
import { AuthStrategy } from './libs/enums'
import errorHandler from '../../common/helpers/error/error.handler'
import { addMetaData, getMetadatas } from '../../common/helpers/addMetaData.helper'
/* -------------------------------------------------------------------------- */

@BindInstance
class AuthController extends Controller {
  async registerLocalUser(req: Request, res: Response, next: NextFunction) {
    /* -------------------------------------------------------------------------- */
    /*                              Swagger Document                              */
    /* -------------------------------------------------------------------------- */
    /*
    #swagger.tags = ['Auth']
    #swagger.summary = 'Register user with passport local jwt strategy'
    #swagger.description = 'Register user with passport local jwt strategy and then return token and user object'
    #swagger.operationId = 'USER_LOCAL_REGISTER'
    #swagger.parameters['body'] = {
      in: 'body',
      '@schema': {
        required: ['data'],
        properties: {
          data: {
            required: ['email', 'password'],
            properties: {
              email: {
                type: 'string',
                example: 'Kasra_K2K@yahoo.com',
              },
              password: {
                type: 'string',
                example: '12345678'
              }
            }
          }
        },
      },
    }
    #swagger.responses[200] = {
      description: 'Backend is fully health.',
      '@schema': { $ref: '#/definitions/Auth' },
    }
    */
    /* -------------------------------------------------------------------------- */

    passport.authenticate(
      AuthStrategy.USER_LOCAL_REGISTER,
      async (err, data: { user: Record<string, any>; token: string }, _: Record<string, any>) => {
        if (err) {
          const error = errorHandler(err.code)
          const additational = getMetadatas(req)
          return res.status(error.status).json({ success: false, ...additational, error })
        } else {
          req.user = data.user
          return addMetaData(req, res, data)
        }
      }
    )(req, res, next)
  }

  async loginLocalUser(req: Request, res: Response, next: NextFunction) {
    /* -------------------------------------------------------------------------- */
    /*                              Swagger Document                              */
    /* -------------------------------------------------------------------------- */
    /*
    #swagger.tags = ['Auth']
    #swagger.title = 'aasdasdasd'
    #swagger.summary = 'Login user with passport local jwt strategy'
    #swagger.description = 'Login user with passport local jwt strategy and then return token and user object'
    #swagger.operationId = 'USER_LOCAL_LOGIN'
    #swagger.parameters['body'] = {
      in: 'body',
      '@schema': {
        required: ['filter'],
        properties: {
          filter: {
            required: ['email', 'password'],
            properties: {
              email: {
                type: 'string',
                example: 'Kasra_K2K@yahoo.com',
              },
              password: {
                type: 'string',
                example: '12345678'
              }
            }
          }
        },
      },
    }
    #swagger.responses[200] = {
      description: 'Backend is fully health.',
      '@schema': { $ref: '#/definitions/Auth' },
    }
    */
    /* -------------------------------------------------------------------------- */

    passport.authenticate(
      AuthStrategy.USER_LOCAL_LOGIN,
      async (err, data: { user: Record<string, any>; token: string }, _: Record<string, any>) => {
        if (err) {
          const error = errorHandler(err.code)
          const additational = getMetadatas(req)
          return res.status(error.status).json({ success: false, ...additational, error })
        } else {
          req.user = data.user
          return addMetaData(req, res, data)
        }
      }
    )(req, res, next)
  }
}

export default new AuthController()
