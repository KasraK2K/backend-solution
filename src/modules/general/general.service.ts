/* ------------------------------ Dependencies ------------------------------ */
/* ----------------------------- Custom Modules ----------------------------- */
import generalRepository from './general.repository'
import errorHandler from '../../common/helpers/error/error.handler'
/* -------------------------------------------------------------------------- */

class GeneralService {
  healthCheck() {
    return new Promise((resolve, reject) => {
      // errorHandler(401)
      generalRepository.healthCheck().then(resolve).catch(reject)
    })
  }
}

export default new GeneralService()
