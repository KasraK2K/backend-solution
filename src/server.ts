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
import startMetricsServer from './apps/prometheus'
import rateLimiterMiddleware from './middlewares/rateLimiter.middleware'
import multipartMiddleware from './middlewares/multipart.middleware'
import requestMiddleware from './middlewares/request.middleware'
// import authMiddleware from './middlewares/auth.middleware'
import responseMiddleware from './middlewares/response.middleware'
import responseTime from 'response-time'
import { printInformation } from './common/helpers/information.helper'
import { ICorsConfig } from './../config/config.interface'
import { addMetaData, getMetadatas } from './common/helpers/addMetaData.helper'
import { startGrpcServer } from './apps/gRPC'
/* -------------------------------------------------------------------------- */

const corsConfig: ICorsConfig = config.get('cors')

const env = dotenv.config({ path: `.env.${process.env.NODE_ENV}` })
dotenvExpand.expand(env)

const app = express()
app.disable('x-powered-by')

const server = http.createServer(app)
const port = process.env.PORT || '3000'

/* ------------------------------- Application ------------------------------ */

app.set('trust proxy', true)

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

app.use(responseTime(responseMiddleware.calculateTime))
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
    return res.status(500).json({ success: false, ...additational, error })
  }
})

server.listen(port).on('listening', async () => {
  printInformation(port)
  startMetricsServer()
  startGrpcServer()
})
