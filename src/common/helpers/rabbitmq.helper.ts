import amqp from 'amqplib/callback_api'

const uri = String(process.env.RBBITMQ_URI)

export const producer = (message: Record<string, any> = {}, queue_name: string): void => {
  amqp.connect(uri, (connection_error, connection) => {
    if (connection_error) throw connection_error

    connection.createChannel((create_channel_error, channel) => {
      if (create_channel_error) throw create_channel_error

      /**
       * @argument {durable} This makes sure the queue is declared before attempting to consume from it
       */
      channel.assertQueue(queue_name, { durable: true })

      /**
       * @argument {persistent} Persistent messages will be written to disk as soon as they reach the queue,
       * while transient messages will be written to disk only so that they can be evicted from memory while under memory pressure
       */
      channel.sendToQueue(queue_name, Buffer.from(JSON.stringify(message)), { persistent: true })
    })

    setTimeout(() => {
      connection.close()
      process.exit(0)
    }, 500)
  })
}
