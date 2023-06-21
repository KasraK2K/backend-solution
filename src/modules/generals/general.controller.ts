/* ------------------------------ Dependencies ------------------------------ */
/* --------------------------------- Modules -------------------------------- */
import BindInstance from '../../common/decorators/bindInstance.decorator'
import generalService from './general.service'
import errorHandler from '../../common/helpers/error/error.handler'

@BindInstance
class GeneralController {
  checkHealth(_, res, next): { message: string } | void {
    const result = generalService.checkHealth()
    return res.json(result)
    errorHandler({ statusCode: 400 })
  }
}

export default new GeneralController()
