/* ------------------------------ Node Modules ------------------------------ */
import { basename } from 'node:path'
/* ----------------------------- Custom Modules ----------------------------- */
import PgRepository from '../../base/repository/PgRepository'
import logger from '../helpers/logger.helper'
/* -------------------------------------------------------------------------- */

const USER_SEED_DATA = {}

class UserSeeder extends PgRepository {
  public async handle() {
    this.totalCount('users', ['id = 1'])
      .then(async (count) => count === 0 && (await this.insert('users', USER_SEED_DATA).exec()))
      .catch((err) =>
        logger.error(`Error on insert user seed ${err.message ?? err}`, {
          dest: basename(__filename),
        })
      )
  }
}

export default UserSeeder
