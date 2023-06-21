/* ------------------------------ Dependencies ------------------------------ */
/* --------------------------------- Modules -------------------------------- */
import generalRepository from './general.repository'
import errorHandler from '../../common/helpers/error/error.handler'
/* -------------------------------------------------------------------------- */

class GeneralService {
  healthCheck(): { message: string } | void {
    return generalRepository.healthCheck()
    errorHandler({ statusCode: 401 })
  }
}

export default new GeneralService()
