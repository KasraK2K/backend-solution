/* ------------------------------ Node Modules ------------------------------ */
import { basename } from 'node:path'
/* ------------------------------ Dependencies ------------------------------ */
import { Request, Response } from 'express'
/* ----------------------------- Custom Modules ----------------------------- */
import logger from '../common/helpers/logger.helper'
import { addMetaData, addMetaDataLogic } from '../common/helpers/addMetaData.helper'
import colour from '../common/utils/logColour.util'
import AppError from '../common/helpers/error/AppError'
/* -------------------------------------------------------------------------- */

type ICallback = (args: any) => any
// type ICallback<T, Args> = (args: Args) => Promise<T> | T

class Controller {
  protected async handle(callback: ICallback, args: any, req: Request, res: Response) {
    const url = req.originalUrl
    logger.debug(`${colour.blue('endpoint')}: ${url}`, { dest: basename(__filename) })
    logger.debug(`${colour.yellow('request')}: \n${JSON.stringify(req.body, undefined, 4)}`, {
      dest: basename(__filename),
    })

    return await callback(args)
      .then((result) => {
        const responseData = addMetaDataLogic(req, result)

        logger.debug(
          `${colour.yellow('response')}: \n${JSON.stringify(
            { ...responseData, result: 'result is omited' },
            undefined,
            4
          )}`,
          {
            dest: basename(__filename),
          }
        )

        return addMetaData(req, res, result)
      })
      .catch((error: AppError) => res.status(error.status).json({ success: false, error }))
  }
}

export default Controller
