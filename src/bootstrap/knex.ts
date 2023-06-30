/* ------------------------------ Dependencies ------------------------------ */
import Knex from 'knex'
import config from 'config'
/* ----------------------------- Custom Modules ----------------------------- */
import { IPostgresConfig } from '../../config/config.interface'
/* -------------------------------------------------------------------------- */

/* NOTE --------------------------------------------------------------------- */
/*                                 How To Use                                 */
/* -------------------------------------------------------------------------- */
/*                        Refrence: https://knexjs.org/                       */
/* -------------------------------------------------------------------------- */
/* Insert */
// knex('users').insert({ name: 'kasra' }).returning('*')

/* Delete */
// await knex('users').where({ id: 2 }).delete()

/* Raw Select */
// const result = await knex.raw('SELECT * FROM ?? LIMIT ??', ['users', 1])
// console.log({ count: result.rowCount, result: result.rows })

/* Raw Insert */
// knex.raw(
//   `INSERT INTO users
//   (email, password,
//     contact_number, first_name, surname, is_verified)
//   VALUES ('k5@k.com', '${bcryptHelper.hashGen('12345678')}',
//     '09123456789', 'Kasra', 'Karami', TRUE)
//   RETURNING *;`
// )
//   .then((result) => console.log(result.rows))
//   .catch(console.error)

/* Transaction */
// const trx = await knex.transaction()
//   trx
//     .raw('SELECT * FROM ??', ['users'])
//     .then((result) => {
//       console.log({ count: result.rowCount, result: result.rows })
//       trx.commit
//     })
//     .catch(trx.rollback)
/* -------------------------------------------------------------------------- */

const pgConfig: IPostgresConfig = config.get('database.postgres')

const knex = Knex({
  client: 'pg',
  connection: {
    host: pgConfig.host,
    user: pgConfig.user,
    password: pgConfig.password,
    database: pgConfig.database,
    domain: 'domain-name',
    instanceName: 'instance-name',
    debug: true,
  },
  searchPath: ['knex', 'public'],
  jsonbSupport: true,
})

export default knex
