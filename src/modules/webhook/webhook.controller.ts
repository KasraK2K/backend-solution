/* ------------------------------ Dependencies ------------------------------ */
import { Request, Response } from 'express'
/* ----------------------------- Custom Modules ----------------------------- */
import Controller from '../../base/Controller'
import { BindInstance } from '../../common/decorators'
// import webhookService from './webhook.service'
import { getMetadatas } from '../../common/helpers/addMetaData.helper'
import Square from '../../integrations/square'
import cryptoUtil from '../../common/utils/crypto.util'
/* -------------------------------------------------------------------------- */

@BindInstance
class WebhookController extends Controller {
  async squareAuthCallback(req: Request, res: Response) {
    if (!req.query['error'] && req.query['response_type'] === 'code') {
      const code = req.query['code'] as string
      const square = new Square()
      const state = req.query['state'] as string
      const user_uid = cryptoUtil.decrypt(state)

      square.auth
        .obtainToken(code)
        .then((response) => {
          const result = response.result
          const { accessToken, refreshToken, expiresAt, merchantId } = result

          console.log({ accessToken, refreshToken, expiresAt, merchantId })

          // TODO : save result somewhere

          return res.redirect(`https://www.example.com/integrate/${user_uid}?status=ok`)
        })
        .catch((error) => {
          const additational = getMetadatas(req)
          return res.status(500).json({ success: false, ...additational, error })
        })
    }
  }
}

export default new WebhookController()
