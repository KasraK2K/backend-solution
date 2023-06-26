/* ------------------------------ Node Modules ------------------------------ */
import os from 'node:os'
import fs from 'node:fs'
import { basename, resolve } from 'node:path'
/* ------------------------------ Dependencies ------------------------------ */
import formidable from 'formidable'
import config from 'config'
import _ from 'lodash'
import { Request, Response, NextFunction } from 'express'
/* ----------------------------- Custom Modules ----------------------------- */
import Middleware from '../base/Middleware'
import logger from '../common/helpers/logger.helper'
import errorHandler from 'src/common/helpers/error/error.handler'
import { IUploadConfig } from '../../config/config.interface'
import { addMetaData } from '../common/helpers/addMetaData.helper'
/* -------------------------------------------------------------------------- */

const uploadConfig: IUploadConfig = config.get('upload')

class MultipartMiddleware extends Middleware {
  public handle(req: Request, res: Response, next: NextFunction) {
    if ((req.headers['content-type'] ?? '').startsWith('multipart/form-data')) {
      const fileBeginDestination = resolve(process.cwd(), uploadConfig.tempDir)

      const form = formidable({
        ...uploadConfig,
        uploadDir: uploadConfig.tempDir === 'tmp' ? os.tmpdir() : fileBeginDestination,
      })

      const checkUpload: Record<string, any> = { valid: true, errors: [] }

      /* ------------------------------ START: EVENTS ----------------------------- */
      form.on('fileBegin', (/* data */) => {
        if (!fs.existsSync(fileBeginDestination))
          fs.mkdirSync(fileBeginDestination, { recursive: true })
      }) // Create a folder if it doesn't exist

      form.on('error', (err) => {
        checkUpload.valid = false
        checkUpload.errors.push(errorHandler(1005).message)
        logger.error(err?.message ?? err, { dest: basename(__filename) })
      }) // Fill errors on get error and log with logger
      /* ------------------------------- END: EVENTS ------------------------------ */

      form.parse(req, (err: any, fields: formidable.Fields, files: formidable.Files) => {
        if (err) {
          logger.error(err?.message ?? err, { dest: basename(__filename) })
          checkUpload.valid = false
          checkUpload.errors.push(errorHandler(1004).message)
        }

        // Parse string to boolean or json
        for (const key in fields) {
          try {
            fields[key] = JSON.parse(fields[key] as string)
          } catch (error) {
            // We don't need to do anything here.
          }
        }

        if (typeof files === 'object' && !Array.isArray(files)) {
          const filesKeys = _.keys(files)
          const validMimetypes = ['image/jpg', 'image/jpeg']

          if (
            !('destination' in fields) ||
            !uploadConfig.validUploadFolders.includes(String(fields.destination))
          ) {
            checkUpload.valid = false
            checkUpload.errors.push(errorHandler(1007).message)
          }

          // if ("id" in fields && !Number(fields.id)) {
          //   checkUpload.valid = false
          //   checkUpload.errors.push(error(1008).message)
          // }

          if (filesKeys.length > uploadConfig.maxFiles) {
            checkUpload.valid = false
            checkUpload.errors.push(errorHandler(1009).message)
          }

          filesKeys.forEach((fileKey) => {
            const file = files[fileKey] as formidable.File
            const index = checkUpload.errors.length
            if (!validMimetypes.includes(String(file.mimetype))) {
              checkUpload.valid = false
              checkUpload.errors[index] = errorHandler(1006).message
            }
          })

          if (!checkUpload.valid) {
            filesKeys.forEach((fileKey) => {
              const file = files[fileKey] as formidable.File
              fs.unlinkSync(file.filepath)
            })
            logger.error(errorHandler(1005).message, { dest: 'MultipartMiddleware.ts' })
            return addMetaData(req, res, {
              errCode: 1005,
              statusCode: 400,
              errors: checkUpload.errors,
            })
          }
        }

        _.assign(req.body, fields)
        _.assign(req.body, { files })

        next()
      })
    } else next()
  }
}

export default new MultipartMiddleware()
