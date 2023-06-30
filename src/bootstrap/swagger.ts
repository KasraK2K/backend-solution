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
    Auth: {
      type: 'object',
      properties: {
        token: { type: 'string' },
        user: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            email: { type: 'integer' },
            contact_number: { type: 'string' },
            first_name: { type: 'string' },
            surname: { type: 'string' },
            login_type: { type: 'integer' },
            login_id: { type: 'string' },
            is_active: { type: 'boolean' },
            is_verified: { type: 'boolean' },
            is_blocked: { type: 'boolean' },
            is_archive: { type: 'boolean' },
            business_name: { type: 'string' },
            business_category: { type: 'string' },
            business_size: { type: 'string' },
            permission: { type: 'integer' },
            partner_id: { type: 'integer' },
            created_at: { type: 'string' },
            updated_at: { type: 'string' },
            archived_at: { type: 'string' },
          },
        },
      },
    },
  },
}
swaggerAutogen(outputFile, [routerPath], doc)
