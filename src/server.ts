import './bootstrap'
/* -------------------------------------------------------------------------- */
import http from 'node:http'
/* -------------------------------------------------------------------------- */
import express from 'express'
import methodOverride from 'method-override'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'
/* -------------------------------------------------------------------------- */
import router from './router'
import errorHandler from './common/helpers/error/error.handler'
import AppError from './common/helpers/error/AppError'
/* -------------------------------------------------------------------------- */

const env = dotenv.config({ path: `.env.${process.env.NODE_ENV}` })
dotenvExpand.expand(env)

const app = express()
const server = http.createServer(app)
const port = process.env.PORT || '3000'

/* -------------------------------------------------------------------------- */
app.set('port', port)
app.set('server_address', process.env.SERVER_ADDRESS)
/* -------------------------------------------------------------------------- */
app.use(methodOverride())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(helmet())
app.use('/', router)
/* -------------------------------------------------------------------------- */
app.use((err: AppError, _, res, __) => {
  if (err instanceof AppError)
    return res.status(err.statusCode).json({
      success: false,
      error: err.cause,
      data: null,
    })
  else console.log('Unknown type error:', err)
})
/* -------------------------------------------------------------------------- */

server
  .listen(app.get('port'))
  .on('listening', () => console.log(`㉿HTTP:\t ${app.get('server_address')}`))
