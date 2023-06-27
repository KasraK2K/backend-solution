/* ---------------------------------- Boot ---------------------------------- */
import './bootstrap'
/* ------------------------------ Node Modules ------------------------------ */
import http from 'node:http'
import { basename, resolve } from 'node:path'
/* ------------------------------ Dependencies ------------------------------ */
import express from 'express'
import methodOverride from 'method-override'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'
import compression from 'compression'
import config from 'config'
/* ----------------------------- Custom Modules ----------------------------- */
import router from './routes'
import AppError from './common/helpers/error/AppError'
import logger from './common/helpers/logger.helper'
import colour from './common/utils/logColour.util'
import UserSeeder from './common/seeder/user.seed'
import rateLimiterMiddleware from './middlewares/rateLimiter.middleware'
import multipartMiddleware from './middlewares/multipart.middleware'
import requestMiddleware from './middlewares/request.middleware'
import authMiddleware from './middlewares/auth.middleware'
import { printInformation } from './common/helpers/information.helper'
import { ICorsConfig } from './../config/config.interface'
import { getMetadatas } from './common/helpers/addMetaData.helper'
/* -------------------------------------------------------------------------- */

const corsConfig: ICorsConfig = config.get('cors')

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
app.use(express.urlencoded({ extended: false }))
app.use(helmet())
app.use(compression())
app.use(
  cors({
    optionsSuccessStatus: corsConfig.optionsSuccessStatus,
    methods: corsConfig.methods,
    origin: corsConfig.origin,
  })
)

app.disable('x-powered-by')
app.use(express.static(resolve(process.cwd(), 'public')))

app.use(rateLimiterMiddleware.check())
app.use(multipartMiddleware.handle)
app.use(requestMiddleware.processIdAdder)
app.use(requestMiddleware.isMethodAllowed)
// app.use(authMiddleware.auth)

app.use('/', router)
app.use('*', (error: AppError, req, res, __) => {
  const additational = getMetadatas(req)
  if (error instanceof AppError) {
    return res.status(error.status).json({ success: false, ...additational, error })
  } else {
    logger.error(colour.red('Unknown type error:'), { dest: basename(__filename), error })
    return res.status().json({ success: false, ...additational, error })
  }
})

server.listen(app.get('port')).on('listening', async () => {
  printInformation(app.get('port'))
  console.log(`HTTP Server is running on ${colour.love.underline(app.get('server_address'))}`)
  // await new UserSeeder().handle()
})
