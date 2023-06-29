/* ------------------------------ Node Modules ------------------------------ */
import { resolve } from 'node:path'
/* ------------------------------ Dependencies ------------------------------ */
import swaggerAutogen from 'swagger-autogen'
/* -------------------------------------------------------------------------- */

const routerPath = resolve(process.cwd(), 'src/routes/index.ts')
const outputFile = resolve(process.cwd(), './swagger.json')

interface User {
  id: number
  first_name: string
  surname: string
}

const doc = {
  info: {
    title: 'Backend Solution API',
    description: 'My Solution to have a clean and flexible backend.',
  },
  host: process.env.SERVER_ADDRESS,
  schemes: ['http'],
  '@definitions': {
    User: {
      type: 'object',
      properties: {
        id: { type: 'integer', description: 'identify number' },
        first_name: { type: 'string', description: 'user first name' },
        surname: { type: 'string', description: 'user surname' },
      },
    },
  },
}
swaggerAutogen(outputFile, [routerPath], doc)
