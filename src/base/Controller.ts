/* ------------------------------ Node Modules ------------------------------ */
import { basename } from 'node:path'
/* ------------------------------ Dependencies ------------------------------ */
import { Request, Response } from 'express'
import config from 'config'
/* ----------------------------- Custom Modules ----------------------------- */
import logger from '../common/helpers/logger.helper'
import { addMetaData, getMetadatas } from '../common/helpers/addMetaData.helper'
import colour from '../common/utils/logColour.util'
import AppError from '../common/helpers/error/AppError'
import { IApplicationConfig } from '../../config/config.interface'
/* -------------------------------------------------------------------------- */

const applicationConfig: IApplicationConfig = config.get('application')
const mode: string = config.get('mode')

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
        const additational = getMetadatas(req, result)

        logger.debug(
          `${colour.yellow('response')}: \n${JSON.stringify(
            { success: true, ...additational, result: 'result is omited' },
            undefined,
            4
          )}`,
          {
            dest: basename(__filename),
          }
        )

        return addMetaData(req, res, result)
      })
      .catch((error: AppError) => {
        const additational = getMetadatas(req)

        return res.status(error.status).json({ success: false, ...additational, error })
      })
  }
}

export default Controller
