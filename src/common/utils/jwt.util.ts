/* ------------------------------ Dependencies ------------------------------ */
import { sign, decode, verify, JwtPayload, SignOptions, DecodeOptions } from 'jsonwebtoken'
import _ from 'lodash'
/* ------------------------------ Custom Module ----------------------------- */
import logger from '../helpers/logger.helper'
import { ModuleName } from '../enums/general.enum'
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                 How To Use                                 */
/* -------------------------------------------------------------------------- */
// import jwt from 'src/common/utils/jwt.util'

// const payload = { foo: 'bar' }
// const jwtToken = jwt.payloadToJwt(payload)
// const tokenToPayload = jwt.jwtToPayload(jwtToken)
// const isValidToken = jwt.verifyJwt(jwtToken)
/* -------------------------------------------------------------------------- */

export interface IJwtVerify {
  valid: boolean
  data: Record<string, any>
}

class Jwt {
  public payloadToJwt(payload: Record<string, any>, options?: SignOptions | undefined): string {
    return sign(payload, String(process.env.JWT_SECRET), options)
  }

  public jwtToPayload(
    token: string,
    options?: DecodeOptions | undefined
  ): string | JwtPayload | null {
    return decode(token, options)
  }

  public verifyJwt(token: string): IJwtVerify {
    const returnValue: IJwtVerify = { valid: false, data: {} }

    verify(token, String(process.env.JWT_SECRET), (err, decoded) => {
      if (err) {
        returnValue.valid = false
        logger.warn(err.message, { service: ModuleName.DEFAULT, dest: 'jwt.util.ts' })
      } else {
        returnValue.valid = true
        returnValue.data = {}
        typeof decoded === 'object' && _.keys(decoded).length && _.assign(returnValue.data, decoded)
      }
    })

    return returnValue
  }
}

export default new Jwt()
