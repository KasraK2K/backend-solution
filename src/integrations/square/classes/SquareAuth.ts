/* ----------------------------- Custom Modules ----------------------------- */
import Square from '..'
import cryptoUtil from '../../../common/utils/crypto.util'
/* -------------------------------------------------------------------------- */

class SquareAuth {
  constructor(private superThis: Square) {}

  /* -------------------------------------------------------------------------- */
  /*                                 How To Use                                 */
  /* -------------------------------------------------------------------------- */
  // const scopes = ['ITEMS_READ','MERCHANT_PROFILE_READ','PAYMENTS_WRITE_ADDITIONAL_RECIPIENTS','PAYMENTS_WRITE','PAYMENTS_READ']
  // const url = square.auth.getUrl(scopes, '550e8400-e29b-41d4-a716-446655440000')
  /* -------------------------------------------------------------------------- */
  getUrl(scopes: string[], user_uid: string): string {
    const state = cryptoUtil.encrypt(user_uid)

    const { application_id } = this.superThis.certificate
    const basePath = this.superThis.basePath
    const stringScope = scopes.join('+')

    const url = `${basePath}/oauth2/authorize?client_id=${application_id}&response_type=code&scope=${stringScope}&state=${state}`
    return url
  }

  async obtainToken(code: string) {
    return await this.superThis.client.oAuthApi.obtainToken({
      code,
      clientId: this.superThis.certificate.application_id,
      clientSecret: this.superThis.certificate.application_secret,
      grantType: 'authorization_code',
    })
  }
}

export default SquareAuth
