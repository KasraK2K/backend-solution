/* ----------------------------- Custom Modules ----------------------------- */
import errorHandler from '../../common/helpers/error/error.handler'
import { selectQuery } from './general.query'
// import sqlReader from '../../common/helpers/sqlReader'
/* -------------------------------------------------------------------------- */

class GeneralRepository {
  public healthCheck() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const condition = true

        if (!condition) reject(errorHandler(1000))
        else resolve({ message: selectQuery({ selectFields: ['name', 'age'] }) })
      }, 0)
    })
  }
}

export default new GeneralRepository()
