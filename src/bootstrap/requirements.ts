/* ------------------------------ Dependencies ------------------------------ */
import assert from 'assert'
/* -------------------------------------------------------------------------- */

const REQUIRED_ENVIRONMENTS: string[] = [
  'NODE_ENV',
  'PORT',
  'SERVER_ADDRESS',
  'API_KEY',
  'RBBITMQ_URI',
  'PROMETHEUS_PORT',
  'PROMETHEUS_SERVER_ADDRESS',
  'BUSINESS_NAME',
  'APP_NAME',
  // 'MONGO_URI',
  // 'METRIC_PORT',
  // 'SENTRY_DSN',
]

for (const key of REQUIRED_ENVIRONMENTS)
  assert.ok(process.env[key], `The ${key} environment variable is required`)
