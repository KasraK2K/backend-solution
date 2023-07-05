/* ------------------------------ Node Modules ------------------------------ */
import { basename } from 'node:path'
/* ------------------------------ Dependencies ------------------------------ */
import _ from 'lodash'
/* ----------------------------- Custom Modules ----------------------------- */
import { IStripeGetCharge, Stripe } from '..'
import logger from '../../../common/helpers/logger.helper'
/* -------------------------------------------------------------------------- */

class StripeCharges {
  constructor(public superThis: Stripe) {}

  public get = async (args?: IStripeGetCharge): Promise<Record<string, any>> => {
    return new Promise(async (resolve, reject) => {
      const charge_id = args ? args.charge_id : ''

      await this.superThis.stripeObj.charges
        .retrieve(charge_id)
        .then((response: Record<string, any>) => resolve(response))
        .catch((error: { type: string; message: string }) => {
          const errorMessage: string = this.superThis.getErrorMessage(error)
          logger.error(errorMessage, { dest: basename(__filename), error })
          return reject({ error_message: error })
        })
    })
  }
}

export default StripeCharges
