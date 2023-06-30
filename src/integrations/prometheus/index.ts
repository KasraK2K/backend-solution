/* ------------------------------ Dependencies ------------------------------ */
import express, { Request, Response } from 'express'
import client from 'prom-client'
/* ----------------------------- Custom Modules ----------------------------- */
import colour from '../../common/utils/logColour.util'
/* -------------------------------------------------------------------------- */

const app = express()
// const register = new client.Registry()

const startMetricsServer = (port) => {
  client.collectDefaultMetrics()

  app.get('/metrics', async (_: Request, res: Response) => {
    res.set('Content-Type', client.register.contentType)
    return res.send(await client.register.metrics())
  })

  app.listen(port, () =>
    console.log(
      `${colour.love('Prometheus Metrics')} running on:\t ${colour.green.underline(
        process.env.PROMETHEUS_SERVER_ADDRESS
      )}`
    )
  )
}

export default startMetricsServer
