/* ------------------------------ Dependencies ------------------------------ */
import { JwtPayload, SignOptions, DecodeOptions } from 'jsonwebtoken'
/* ----------------------------- Custom Modules ----------------------------- */
import jwt, { IJwtVerify } from '../utils/jwt.util'
import crypto from '../utils/crypto.util'
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                 How To Use                                 */
/* -------------------------------------------------------------------------- */
// import tokenHelper from 'src/common/helpers/token.helper'

// const payload = { foo: 'bar' }
// const encryptedJwt = tokenHelper.sign(payload)
// const decryptedPayload = tokenHelper.decode(encryptedJwt)
// const isValidEncryptedJwt = tokenHelper.verify(encryptedJwt)
/* -------------------------------------------------------------------------- */

class Token {
  public sign(payload: Record<string, any>, options?: SignOptions | undefined): string {
    return crypto.encrypt(jwt.payloadToJwt(payload, options))
  }

  public decode(
    encryptedToken: string,
    options?: DecodeOptions | undefined
  ): string | JwtPayload | null {
    return jwt.jwtToPayload(crypto.decrypt(encryptedToken), options)
  }

  public verify(encryptedText: string): IJwtVerify {
    try {
      const jwtToken = crypto.decrypt(encryptedText)
      return jwt.verifyJwt(jwtToken)
    } catch {
      return { valid: false, data: {} }
    }
  }
}

export default new Token()
