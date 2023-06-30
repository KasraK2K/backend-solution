/* ------------------------------ Dependencies ------------------------------ */
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import _ from 'lodash'
/* ----------------------------- Custom Modules ----------------------------- */
import { AuthStrategy, AuthTypes } from '../libs/enums'
import knex from '../../../bootstrap/knex'
import bcryptHelper from '../../../common/helpers/bcrypt.helper'
import errorHandler from '../../../common/helpers/error/error.handler'
import tokenHelper from '../../../common/helpers/token.helper'
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                        Register with Local Strategy                        */
/* -------------------------------------------------------------------------- */
passport.use(
  AuthStrategy.USER_LOCAL_REGISTER,
  new LocalStrategy(
    {
      usernameField: 'data[]email',
      passwordField: 'data[]password',
    },
    async (email: string, password: string, done: (...args: any[]) => any) => {
      try {
        await knex('users')
          .insert({
            email: email.toLowerCase(),
            password: bcryptHelper.hashGen(password),
            contact_number: '09123456789',
            first_name: 'Kasra',
            surname: 'Karami',
            is_verified: true,
          })
          .returning('*')
          .then((result) => handleResult(result, done))
          .catch((err) => done(errorHandler(err.code), false, { message: 'User not created' }))
      } catch (error) {
        done(error)
      }
    }
  )
)

/* -------------------------------------------------------------------------- */
/*                          Login with Local Strategy                         */
/* -------------------------------------------------------------------------- */
passport.use(
  AuthStrategy.USER_LOCAL_LOGIN,
  new LocalStrategy(
    {
      usernameField: 'filter[]email',
      passwordField: 'filter[]password',
    },
    async (email: string, password: string, done: (...args: any[]) => any) => {
      email = email.toLowerCase()
      try {
        await knex('users')
          .select('*')
          .where({ email: email.toLowerCase() })
          .then((result) => handleResult(result, done, password))
          .catch((err) => done(errorHandler(err.code), false, { message: 'User not Found' }))
      } catch (error) {
        done(error)
      }
    }
  )
)

/* -------------------------------------------------------------------------- */
/*                              Private Functions                             */
/* -------------------------------------------------------------------------- */
const handleResult = (
  result: Record<string, any>,
  done: (...args: any[]) => any,
  password?: string
) => {
  // Check password validation in login
  if (result && result.length) {
    if (password && password.length) {
      const isPasswordValid = bcryptHelper.compareHash(password, result[0].password)
      if (!isPasswordValid) {
        const error = errorHandler(403, { status: 403, message: 'Login information is wrong.' })
        return done(null, error, { message: 'Login information is wrong.' })
      }
    }

    const user = _.omit(result[0], ['password'])
    const payload = { id: user.id, type: AuthTypes.ADMIN }
    const token = tokenHelper.sign(payload)
    return done(null, { token, user }, { message: 'Logged in Successfully.' })
  } else {
    const error = errorHandler(404, { status: 404, message: 'User Not Found.' })
    return done(null, error, { message: 'User Not Found.' })
  }
}
