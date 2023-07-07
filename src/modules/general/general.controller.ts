/* ------------------------------ Dependencies ------------------------------ */
import { Request, Response } from 'express'
/* ----------------------------- Custom Modules ----------------------------- */
import Controller from '../../base/Controller'
import { BindInstance, Cache, Role } from '../../common/decorators'
import generalService from './general.service'
/* -------------------------------------------------------------------------- */

@BindInstance
class GeneralController extends Controller {
  @Cache(5)
  @Role(['admin', 'user'])
  async healthCheck(req: Request, res: Response) {
    /* -------------------------------------------------------------------------- */
    /*                              Swagger Document                              */
    /* -------------------------------------------------------------------------- */
    /*
    #swagger.tags = ['General']
    #swagger.summary = 'Check Backend Health'
    #swagger.description = 'Check health of backend, third parties and integrations like kafka, firebase, etc'
    #swagger.operationId = 'Your_operationId_here'
    #swagger.parameters['body'] = {
      in: 'body',
      '@schema': {
        required: ['name'],
        properties: {
          name: {
            type: 'string',
            minLength: 2,
            maxLength: 250,
            example: 'Kasra',
          },
        },
      },
    }
    #swagger.responses[200] = {
      description: 'Backend is fully health.',
      '@schema': { $ref: '#/definitions/User' },
    }
    */
    /* -------------------------------------------------------------------------- */

    // console.log(__filename, req.process_id)
    await super.handle(generalService.healthCheck, undefined, req, res)
  }
}

export default new GeneralController()
