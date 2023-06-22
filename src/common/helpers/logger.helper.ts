/* ------------------------------ Node Modules ------------------------------ */
import fs from 'node:fs'
import path from 'node:path'
/* ------------------------------ Dependencies ------------------------------ */
import { createLogger, transports, format } from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'
import config from 'config'
/* ----------------------------- Custom Modules ----------------------------- */
import { ILoggerConfig } from '../../../config/config.interface'
import deleteFile from '../utils/deleteFile.util'
import { ModuleName } from '../enums/general.enum'
/* -------------------------------------------------------------------------- */

/* -------------------------------- Constants ------------------------------- */
const loggerConfig: ILoggerConfig = config.get('logger')

const directory = path.resolve(loggerConfig.winston.dirname)
if (!fs.existsSync(directory)) fs.mkdirSync(directory)

const logLevel = process.env.NODE_ENV === 'production' ? 'warn' : 'debug'

const options = {
  ...loggerConfig.winston,
  dirname: directory,
}
/* -------------------------------------------------------------------------- */

/* -------------------------------- Error Log ------------------------------- */
let errorTransport: DailyRotateFile = {} as DailyRotateFile

if (loggerConfig.logOnFile) {
  errorTransport = new DailyRotateFile({
    level: 'error',
    filename: '%DATE%__error',
    ...options,
  })

  // errorTransport.on("new", (newFilename) => console.log(`${newFilename} Created`))
  // errorTransport.on("archive", (zipFilename) => console.log(`${zipFilename} Archived`))
  errorTransport.on('rotate', (oldFilename) =>
    deleteFile(oldFilename, { dest: 'logger.helper.ts' })
  )
  // errorTransport.on("logRemoved", (removedFilename) => console.log(`${removedFilename} Removed`))
}
/* -------------------------------------------------------------------------- */

/* ------------------------------- Combine Log ------------------------------ */
let combinedTransport: DailyRotateFile = {} as DailyRotateFile

if (loggerConfig.logOnFile) {
  combinedTransport = new DailyRotateFile({
    filename: '%DATE%__combined',
    ...options,
  })

  // combinedTransport.on("new", (newFilename) => console.log(`${newFilename} Created`))
  // combinedTransport.on("archive", (zipFilename) => console.log(`${zipFilename} Archived`))
  combinedTransport.on('rotate', (oldFilename) =>
    deleteFile(oldFilename, { dest: 'logger.helper.ts' })
  )
  // combinedTransport.on("logRemoved", (removedFilename) => console.log(`${removedFilename} Removed`))
}
/* -------------------------------------------------------------------------- */

/* -------------------------------- Formatter ------------------------------- */
const jsonLogFileFormat =
  process.env.NODE_ENV === 'production'
    ? format.combine(format.errors({ stack: true }), format.timestamp(), format.json())
    : format.combine(format.errors({ stack: true }), format.timestamp(), format.prettyPrint())
/* -------------------------------------------------------------------------- */

/* ------------------------------ Create Logger ----------------------------- */
const logger = createLogger({
  level: logLevel,
  format: jsonLogFileFormat,
  defaultMeta: { service: ModuleName.DEFAULT },
  transports: loggerConfig.logOnFile ? [errorTransport, combinedTransport] : [],
  // exceptionHandlers: any
  // rejectionHandlers: any
  exitOnError: false,
})
/* -------------------------------------------------------------------------- */

/* ----------------------------- Log on Console ----------------------------- */
if (loggerConfig.logOnConsole) {
  logger.add(
    new transports.Console({
      format: format.combine(
        format.errors({ stack: true }),
        format.colorize(),
        format.printf(({ level, message, timestamp, stack }) => {
          if (stack) return `${timestamp} ${level}: ${message} - ${stack}`
          else return `${timestamp} ${level}: ${message}`
        })
      ),
    })
  )
}
/* -------------------------------------------------------------------------- */
export default logger
