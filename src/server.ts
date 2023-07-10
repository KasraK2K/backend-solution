/* ------------------------------ Node Modules ------------------------------ */
import { basename } from 'node:path'
/* ----------------------------- Custom Modules ----------------------------- */
import { server, port } from './application'
import startMetricsServer from './apps/prometheus'
import { printInformation } from './common/helpers/information.helper'
import { startGrpcServer } from './apps/gRPC'
import registerSocketServer from './apps/socket'
import logger from './common/helpers/logger.helper'
import colour from './common/utils/logColour.util'
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                             UNHANDLED REJECTION                            */
/* -------------------------------------------------------------------------- */
process.on('unhandledRejection', (reason, p) => {
  logger.error(colour.red('Unhandled Rejection error'), {
    dest: basename(__filename),
    error: reason,
  })
  console.error(colour.red(`{red}Unhandled Rejection at: Promise ${p} Reson: ${reason}{reset}`))
})

/* -------------------------------------------------------------------------- */
/*                             UNCAUGHT EXCEPTION                             */
/* -------------------------------------------------------------------------- */
process.on('uncaughtException', (error) => {
  logger.error(colour.red('Uncaught Exception error'), { dest: basename(__filename), error })
  console.error(colour.red(error.message))
  console.error(error.stack)
  process.exit(1)
})

server.listen(port).on('listening', async () => {
  printInformation(port)
  registerSocketServer()
  startMetricsServer()
  startGrpcServer()
})
