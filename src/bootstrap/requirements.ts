import { strict } from 'assert'
import errorHandler from '../common/helpers/error/error.handler'

const REQUIRED_ENVIRONMENTS: string[] = [
  'NODE_ENV',
  'PORT',
  // 'MONGO_URI',
  // 'SERVER_ADDRESS',
  // 'METRIC_PORT',
  // 'SENTRY_DSN',
]

const environmentErrors: string[] = []

for (const key of REQUIRED_ENVIRONMENTS)
  try {
    strict.ok(process.env[key])
  } catch (_) {
    environmentErrors.push(`The ${key} environment variable is required`)
  }

if (environmentErrors.length) errorHandler({ statusCode: 500, batch_messages: environmentErrors })
