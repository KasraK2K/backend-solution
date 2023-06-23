/* ------------------------------ Dependencies ------------------------------ */
import IORedis from 'ioredis'
import config from 'config'
/* ----------------------------- Custom Modules ----------------------------- */
import { IRedisIoConfig } from '../../../../config/config.interface'
import { Jobs, Queue } from '..'
/* -------------------------------------------------------------------------- */

const ioRedisConfig: IRedisIoConfig = config.get('database.ioRedis')
const connection = new IORedis(ioRedisConfig)

class BullMQ {
  public queue: Queue<any, any, string>
  public connection = connection
  public job = new Jobs(this)

  constructor(private queueName: string) {
    this.queue = new Queue(this.queueName, { connection })
  }
}

export default BullMQ
