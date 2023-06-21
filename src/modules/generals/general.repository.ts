/* ------------------------------ Dependencies ------------------------------ */
import fs from 'node:fs'
/* --------------------------------- Modules -------------------------------- */
import errorHandler from '../../common/helpers/error/error.handler'
import { selectQuery } from './general.query'
// import sqlReader from '../../common/helpers/sqlReader'
/* -------------------------------------------------------------------------- */

class GeneralRepository {
  public healthCheck(): { message: string } | void {
    return { message: selectQuery({ selectFields: ['name', 'age'] }) }
    errorHandler({ statusCode: 403 })
  }
}

export default new GeneralRepository()
