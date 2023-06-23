/* ---------------------------------- Boot ---------------------------------- */
import './bootstrap'
/* ------------------------------ Node Modules ------------------------------ */
import http from 'node:http'
import { basename } from 'node:path'
/* ------------------------------ Dependencies ------------------------------ */
import express from 'express'
import methodOverride from 'method-override'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'
/* ----------------------------- Custom Modules ----------------------------- */
import router from './routes'
import AppError from './common/helpers/error/AppError'
import logger from './common/helpers/logger.helper'
import colour from './common/utils/logColour.util'
import { printInformation } from './common/helpers/information.helper'
/* -------------------------------------------------------------------------- */

const env = dotenv.config({ path: `.env.${process.env.NODE_ENV}` })
dotenvExpand.expand(env)

const app = express()
const server = http.createServer(app)
const port = process.env.PORT || '3000'

/* ------------------------------- Application ------------------------------ */

app.set('port', port)
app.set('server_address', process.env.SERVER_ADDRESS)

/* ------------------------------- Middleware ------------------------------- */
app.use(methodOverride())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(helmet())
app.use('/', router)
app.use('*', (error: AppError, _, res, __) => {
  if (error instanceof AppError)
    return res.status(error.status).json({
      success: false,
      error,
      data: null,
    })
  else {
    logger.error(colour.red('Unknown type error:'), { dest: basename(__filename), error })
    return res.status().json({
      success: false,
      error,
      data: null,
    })
  }
})

server.listen(app.get('port')).on('listening', () => {
  printInformation(app.get('port'))
  console.log(`HTTP Server is running on ${colour.love.underline(app.get('server_address'))}`)
})
