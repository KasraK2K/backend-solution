export interface IKafkaConfig {
  host: string
  port: string
  clientId: string
  transactionalId?: string
}
