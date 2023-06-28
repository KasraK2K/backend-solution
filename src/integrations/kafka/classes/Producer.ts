/* ------------------------------ Node Modules ------------------------------ */
import { nextTick } from 'node:process'
/* ------------------------------ Dependencies ------------------------------ */
import {
  CompressionTypes,
  Kafka,
  logLevel,
  Message,
  Partitioners,
  Producer,
  ProducerBatch,
  TopicMessages,
  IKafkaConfig,
  RecordMetadata,
  Transaction,
} from '..'
/* -------------------------------------------------------------------------- */

/* NOTE --------------------------------------------------------------------- */
/*                                 How To Use                                 */
/* -------------------------------------------------------------------------- */
// const config: IKafkaConfig = {
//   host: 'localhost',
//   port: '9092',
//   clientId: 'default-client-id',
//   transactionalId: 'teditional-id',
// }
// const producer = new ProducerFactory('default-topic', config)

// Now you can use one of the following operations
/* -------------------------------------------------------------------------- */

class ProducerFactory {
  private producer: Producer

  constructor(private topic: string = 'default-topic', private config: IKafkaConfig) {
    this.producer = this.createProducer()
  }

  /* SECTION ------------------------------------------------------------------ */
  /*                               Start Producer                               */
  /* -------------------------------------------------------------------------- */
  // producer
  //   .start()
  //   .then(() => {
  //     // Do Something ...
  //   })
  //   .catch((err) => errorHandler(err.name, { status: 500, message: err.message }))
  /* -------------------------------------------------------------------------- */
  public async start(): Promise<void> {
    try {
      await this.producer.connect()
    } catch (error) {
      throw error
    }
  }

  public async shutdown(): Promise<void> {
    await this.producer.disconnect()
  }

  /* SECTION ------------------------------------------------------------------ */
  /*                                 Transaction                                */
  /* -------------------------------------------------------------------------- */
  // Do not forget to `start` producer then `produce` and after all `shutdown`
  /* -------------------------------------------------------------------------- */
  // producer.transaction([{ key: 'key-1', value: 'value-1' }])
  //   .then(console.log)
  //   .catch((err) => errorHandler(err.name, { status: 500, message: err.message }))
  /* -------------------------------------------------------------------------- */
  public async transaction(messages: Message[]): Promise<RecordMetadata[] | void> {
    const transaction = await this.producer.transaction()

    try {
      const metadata = await transaction.send({
        topic: this.topic,
        messages,
        compression: CompressionTypes.GZIP,
      })
      await transaction.commit()
      return metadata
    } catch (e) {
      await transaction.abort()
    }
  }

  /* SECTION ------------------------------------------------------------------ */
  /*                              Batch Trasaction                              */
  /* -------------------------------------------------------------------------- */
  // Do not forget to `start` producer then `produce` and after all `shutdown`
  /* -------------------------------------------------------------------------- */
  // producer
  //   .transactionBatch({
  //     topicMessages: [{ topic: 'default-topic', messages: [{ key: 'key-1', value: 'value-1' }] }],
  //   }).then(console.log).catch(err => errorHandler(err.name, { status: 500, message: err.message }))
  /* -------------------------------------------------------------------------- */
  public async transactionBatch(batch: ProducerBatch): Promise<RecordMetadata[] | void> {
    const transaction = await this.producer.transaction()

    try {
      const metadata = await transaction.sendBatch({
        ...batch,
        compression: CompressionTypes.GZIP,
      })
      await transaction.commit()
      return metadata
    } catch (e) {
      await transaction.abort()
    }
  }

  /* SECTION ------------------------------------------------------------------ */
  /*                                 Batch Send                                 */
  /* -------------------------------------------------------------------------- */
  // Do not forget to `start` producer then `produce` and after all `shutdown`
  /* -------------------------------------------------------------------------- */
  // await producer
  //   .sendBatch<{ key: string }>([{ key: 'value' }])
  //   .then(console.log)
  //   .catch((err) => errorHandler(500, { status: 500, message: err.message }))
  /* -------------------------------------------------------------------------- */
  public async sendBatch<T>(messages: T[]): Promise<RecordMetadata[]> {
    const kafkaMessages: Array<Message> = messages.map((message) => {
      return { value: JSON.stringify(message) }
    })

    const topicMessages: TopicMessages = {
      topic: this.topic,
      messages: kafkaMessages,
    }

    const batch: ProducerBatch = {
      topicMessages: [topicMessages],
      compression: CompressionTypes.GZIP,
    }

    return await this.producer.sendBatch(batch)
  }

  private createProducer(): Producer {
    const { host, port, clientId, transactionalId } = this.config

    const kafka = new Kafka({
      logLevel: logLevel.ERROR,
      brokers: [`${host}:${port}`],
      clientId: clientId,
    })

    return kafka.producer({ createPartitioner: Partitioners.DefaultPartitioner, transactionalId })
  }
}

export default ProducerFactory
