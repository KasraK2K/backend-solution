/* ------------------------------ Dependencies ------------------------------ */
import config from 'config'
import _ from 'lodash'
/* ------------------------------ Custom Module ----------------------------- */
import { IApplicationConfig } from '../../../config/config.interface'
import { Request, Response } from 'express'
/* -------------------------------------------------------------------------- */

const applicationConfig: IApplicationConfig = config.get('application')
const mode: string = config.get('mode')

export interface IResponseData {
  api_version: string
  front_version: string
  portal_version: string
  endpoint: string
  env: string
  mode: string
  count?: number
  data?: any
}

export const getMetadatas = (req: Request, data?: any) => {
  const isDataArray = Array.isArray(data)
  const responseData: IResponseData = {
    api_version: applicationConfig.api_version,
    front_version: applicationConfig.front_version,
    portal_version: applicationConfig.portal_version,
    endpoint: req.originalUrl,
    env: String(process.env.NODE_ENV),
    mode,
    count: isDataArray ? data.length : undefined,
    data,
  }
  return responseData
}

export const addMetaData = (req: Request, res: Response, data: any, status = 200) => {
  const responseData = getMetadatas(req, data)
  return res.status(status).json({ success: true, ...responseData })
}
