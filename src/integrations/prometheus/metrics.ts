/* ------------------------------ Dependencies ------------------------------ */
import client from 'prom-client'
/* -------------------------------------------------------------------------- */

const restResponseTimeHistogram = new client.Histogram({
  name: 'rest_response_time_duration_seconds',
  help: 'REST API response time in seconds.',
  labelNames: ['business_name', 'app_name', 'method', 'route', 'status_code'],
})

export default restResponseTimeHistogram
