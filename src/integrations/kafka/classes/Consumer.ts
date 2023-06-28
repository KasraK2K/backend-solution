/* ----------------------------- Custom Modules ----------------------------- */
import {
  Consumer,
  ConsumerSubscribeTopics,
  EachBatchPayload,
  Kafka,
  EachMessagePayload,
  IKafkaConfig,
} from '..'
/* -------------------------------------------------------------------------- */

/* NOTE --------------------------------------------------------------------- */
/*                                 How to Use                                 */
/* -------------------------------------------------------------------------- */
/*                       Refrence: https://kafka.js.org/                      */
/* -------------------------------------------------------------------------- */
// const config: IKafkaConfig = { host: 'localhost', port: '9092', clientId: 'default-client-id' }
// const consumer = new ConsumerFactory(config, ['default-topic'], 'default-group')

// Now you can use one of the following operations
/* -------------------------------------------------------------------------- */

class ConsumerFactory {
  private kafkaConsumer: Consumer

  public constructor(
    private config: IKafkaConfig,
    private topics: string[] = ['default-topic'],
    private groupId: string
  ) {
    this.kafkaConsumer = this.createConsumer(this.config, this.groupId)
  }

  /* SECTION ------------------------------------------------------------------ */
  /*                               Start Consumer                               */
  /* -------------------------------------------------------------------------- */
  // Do not forget to shutdown consumer
  /* -------------------------------------------------------------------------- */
  // const callback = (messagePayload: EachMessagePayload): void => {
  //   const { topic, partition, message } = messagePayload
  //   const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
  //   console.log(`- ${prefix} ${message.key}#${message.value}`)
  // }
  // consumer.startConsumer(callback).catch((err) => errorHandler(err.name))
  /* -------------------------------------------------------------------------- */
  public async startConsumer(
    callback: (messagePayload: EachMessagePayload) => void
  ): Promise<void> {
    const topic: ConsumerSubscribeTopics = { topics: this.topics, fromBeginning: false }

    try {
      await this.kafkaConsumer.connect()
      await this.kafkaConsumer.subscribe(topic)

      await this.kafkaConsumer.run({
        eachMessage: async (messagePayload: EachMessagePayload) => await callback(messagePayload),
      })
    } catch (error) {
      throw error
    }
  }

  /* SECTION ------------------------------------------------------------------ */
  /*                            Start Batch Consumer                            */
  /* -------------------------------------------------------------------------- */
  // Do not forget to shutdown consumer
  /* -------------------------------------------------------------------------- */
  // const batchCallback = (eachBatchPayload: EachBatchPayload): void => {
  //   const { batch } = eachBatchPayload
  //   for (const message of batch.messages) console.log(message)
  // }
  // consumer
  //   .startBatchConsumer(batchCallback)
  //   .catch((err) => errorHandler(err.name, { status: 500, message: err.message }))
  /* -------------------------------------------------------------------------- */
  public async startBatchConsumer(
    callback: (eachBatchPayload: EachBatchPayload) => void
  ): Promise<void> {
    const topic: ConsumerSubscribeTopics = {
      topics: this.topics,
      fromBeginning: false,
    }

    try {
      await this.kafkaConsumer.connect()
      await this.kafkaConsumer.subscribe(topic)
      await this.kafkaConsumer.run({
        eachBatch: async (eachBatchPayload: EachBatchPayload) => await callback(eachBatchPayload),
      })
    } catch (error) {
      throw error
    }
  }

  public async shutdown(): Promise<void> {
    await this.kafkaConsumer.disconnect()
  }

  private createConsumer(config: IKafkaConfig, groupId: string): Consumer {
    const { host, port, clientId } = config

    const kafka = new Kafka({
      clientId,
      brokers: [`${host}:${port}`],
    })
    const consumer = kafka.consumer({ groupId })
    return consumer
  }
}

export default ConsumerFactory
