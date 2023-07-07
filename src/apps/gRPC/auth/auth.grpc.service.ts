/* ------------------------------ Node Modules ------------------------------ */
import { resolve } from 'node:path'
/* ------------------------------ Dependencies ------------------------------ */
import _ from 'lodash'
/* ----------------------------- Custom Modules ----------------------------- */
import { grpc, grpcServer, loaderOptions, protoLoader } from '..'
import knex from '../../../bootstrap/knex'
import bcryptHelper from '../../../common/helpers/bcrypt.helper'
import { AuthTypes } from '../../../modules/auth/libs/enums'
import tokenHelper from '../../../common/helpers/token.helper'
/* -------------------------------------------------------------------------- */

/* -------------------------------- Constants ------------------------------- */
const PROTO_PATH = resolve(process.cwd(), 'src/apps/gRPC/auth/proto/auth.proto')
const packageDef = protoLoader.loadSync(PROTO_PATH, loaderOptions)
const grpcObj = grpc.loadPackageDefinition(packageDef)
/* -------------------------------------------------------------------------- */

/* SECTION -------------------- Register Services --------------------------- */
grpcServer.addService(grpcObj.Auth.service, {
  login: async (args, callback) => {
    const { email, password } = args.request

    if (!email || !password)
      return callback({
        status: grpc.status.INVALID_ARGUMENT,
        message: 'Request is not valid for authentication.',
      })
    else {
      await knex('users')
        .select('*')
        .where({ email: email.toLowerCase() })
        .then((result) => {
          const isPasswordValid = bcryptHelper.compareHash(password, result[0].password)
          if (!isPasswordValid)
            return callback({
              status: grpc.status.UNAUTHENTICATED,
              message: 'Email and/or Password is not valid.',
            })
          else {
            const user = _.omit(result[0], ['password'])
            const payload = { id: user.id, type: AuthTypes.ADMIN }
            const token = tokenHelper.sign(payload)
            return callback(null, { status: grpc.status.OK, token, user })
          }
        })
        .catch((err) => callback({ status: grpc.status.UNKNOWN, message: err.message }))
    }
  },

  register: async (args, callback) => {
    const { email, password } = args.request

    if (!email || !password)
      return callback({
        status: grpc.status.INVALID_ARGUMENT,
        message: 'Request is not valid for authentication.',
      })
    else {
      const user = await knex('users').select('*').where({ email: email.toLowerCase() })
      if (user && user.length)
        return callback({ status: grpc.status.ALREADY_EXISTS, message: 'User is already exist.' })

      await knex('users')
        .insert({ email: email.toLowerCase(), password: bcryptHelper.hashGen(password) })
        .returning('*')
        .then((result) => {
          const user = _.omit(result[0], ['password'])
          const payload = { id: user.id, type: AuthTypes.ADMIN }
          const token = tokenHelper.sign(payload)
          return callback(null, { status: grpc.status.OK, token, user })
        })
        .catch((err) => callback({ status: grpc.status.UNKNOWN, message: err.message }))
    }
  },
})
/* -------------------------------------------------------------------------- */
