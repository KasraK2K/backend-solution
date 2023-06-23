/* ------------------------------ Dependencies ------------------------------ */
import { Request, Response } from 'express'
/* ----------------------------- Custom Modules ----------------------------- */
import Controller from '../../base/Controller'
import { BindInstance, Role } from '../../common/decorators'
import generalService from './general.service'
/* -------------------------------------------------------------------------- */

@BindInstance
class GeneralController extends Controller {
  @Role(['admin'])
  async healthCheck(req: Request, res: Response) {
    await super.handle(generalService.healthCheck, undefined, req, res)
  }
}

export default new GeneralController()
