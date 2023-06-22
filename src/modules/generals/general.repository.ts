/* ------------------------------ Dependencies ------------------------------ */
import fs from 'node:fs'
/* ----------------------------- Custom Modules ----------------------------- */
import errorHandler from '../../common/helpers/error/error.handler'
import { selectQuery } from './general.query'
// import sqlReader from '../../common/helpers/sqlReader'
/* -------------------------------------------------------------------------- */

class GeneralRepository {
  public healthCheck(): { message: string } | void {
    errorHandler({ statusCode: 403 })
    return { message: selectQuery({ selectFields: ['name', 'age'] }) }
  }
}

export default new GeneralRepository()
