/* ------------------------------ Dependencies ------------------------------ */
import _ from 'lodash'
/* ----------------------------- Custom Modules ----------------------------- */
import tokenHelper from '../common/helpers/token.helper'
import { TokenMode, TokenType } from '../common/enums/general.enum'
/* -------------------------------------------------------------------------- */

class Service {
  protected createToken(
    entity: Record<string, any>,
    mode: TokenMode
  ): {
    token: string
    expire_token_in: string
    refresh_token: string
    expire_refresh_token_in: string
    entity: Record<string, any>
  } {
    const expire_token_in = '200 days'
    const expire_refresh_token_in = '400 days'

    const token = tokenHelper.sign(
      { id: entity.id, reseller_id: entity.reseller_id, type: TokenType.TOKEN, mode },
      { expiresIn: expire_token_in }
    )
    const refresh_token = tokenHelper.sign(
      { id: entity.id, reseller_id: entity.reseller_id, type: TokenType.REFRESH, mode },
      { expiresIn: expire_refresh_token_in }
    )

    return {
      token,
      expire_token_in,
      refresh_token,
      expire_refresh_token_in,
      entity: _.omit(entity, ['password']),
    }
  }
}

export default Service
