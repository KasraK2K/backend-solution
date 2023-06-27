/* ------------------------------ Dependencies ------------------------------ */
import knex from 'knex'
import config from 'config'
/* ----------------------------- Custom Modules ----------------------------- */
import { IPostgresConfig } from '../../config/config.interface'
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                 How To Use                                 */
/* -------------------------------------------------------------------------- */
/*                        Refrence: https://knexjs.org/                       */
/* -------------------------------------------------------------------------- */
/* Insert */
// pg('users').insert({ name: 'kasra' }).returning('*')

/* Delete */
// await pg('users').where({ id: 2 }).delete()

/* Raw Select */
// const result = await pg.raw('SELECT * FROM ?? LIMIT ??', ['users', 1])
// console.log({ count: result.rowCount, result: result.rows })

/* Raw Insert */
// pg.raw(
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
// const trx = await pg.transaction()
//   trx
//     .raw('SELECT * FROM ??', ['users'])
//     .then((result) => {
//       console.log({ count: result.rowCount, result: result.rows })
//       trx.commit
//     })
//     .catch(trx.rollback)
/* -------------------------------------------------------------------------- */

const pgConfig: IPostgresConfig = config.get('database.postgres')

const pg = knex({
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

export default pg
