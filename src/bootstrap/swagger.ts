/* ------------------------------ Node Modules ------------------------------ */
import { resolve } from 'node:path'
/* ------------------------------ Dependencies ------------------------------ */
import swaggerAutogen from 'swagger-autogen'
/* -------------------------------------------------------------------------- */

const routerPath = resolve(process.cwd(), 'src/routes/index.ts')
const outputFile = resolve(process.cwd(), './swagger-output.json')

const doc = {
  info: {
    title: 'Backend Solution API',
    description: 'My Solution to have a clean and flexible backend.',
  },
  host: process.env.SERVER_ADDRESS,
  schemes: ['http'],
}
swaggerAutogen(outputFile, [routerPath], doc)
