/* ------------------------------ Dependencies ------------------------------ */
/* ----------------------------- Custom Modules ----------------------------- */
import generalRepository from './general.repository'
import errorHandler from '../../common/helpers/error/error.handler'
/* -------------------------------------------------------------------------- */

class GeneralService {
  healthCheck(): { message: string } | void {
    // errorHandler({ statusCode: 401 })
    return generalRepository.healthCheck()
  }
}

export default new GeneralService()
