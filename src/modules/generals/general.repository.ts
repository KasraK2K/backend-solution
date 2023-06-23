/* ------------------------------ Dependencies ------------------------------ */
import fs from 'node:fs'
/* ----------------------------- Custom Modules ----------------------------- */
import errorHandler from '../../common/helpers/error/error.handler'
import { selectQuery } from './general.query'
// import sqlReader from '../../common/helpers/sqlReader'
/* -------------------------------------------------------------------------- */

class GeneralRepository {
  public healthCheck() {
    return new Promise((resolve, reject) => {
      const condition = true

      if (!condition) reject(errorHandler(1000))
      else resolve({ message: selectQuery({ selectFields: ['name', 'age'] }) })
    })
  }
}

export default new GeneralRepository()
