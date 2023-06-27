/* ------------------------------ Node Modules ------------------------------ */
import { existsSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
/* ------------------------------ Dependencies ------------------------------ */
import express from 'express'
import swaggerUi from 'swagger-ui-express'
/* ----------------------------- Custom Modules ----------------------------- */
import v1 from './v1'
/* -------------------------------------------------------------------------- */

const router = express.Router()

router.use('/api/v1', v1)

Promise.resolve()
  .then(() => {
    const swaggerPath = resolve(process.cwd(), './swagger.json')
    if (!existsSync(swaggerPath)) {
      writeFileSync(
        swaggerPath,
        JSON.stringify({
          swagger: '2.0',
          info: {
            title: 'Backend Solution API',
            description: 'My Solution to have a clean and flexible backend.',
            version: '1.0.0',
          },
          host: 'http://localhost:3000',
          basePath: '/',
          schemes: ['http'],
          paths: {},
        })
      )
    }
  })
  .then(() => {
    router.use('/swagger', swaggerUi.serve, swaggerUi.setup(require('../../swagger.json')))
  })

export default router
