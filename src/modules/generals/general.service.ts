/* ------------------------------ Dependencies ------------------------------ */
/* --------------------------------- Modules -------------------------------- */
import generalRepository from './general.repository'
import errorHandler from '../../common/helpers/error/error.handler'
/* -------------------------------------------------------------------------- */

class GeneralService {
  checkHealth(): { message: string } | void {
    return generalRepository.checkHealth()
    errorHandler({ statusCode: 401 })
  }
}

export default new GeneralService()
