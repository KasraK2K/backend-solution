/* ------------------------------ Dependencies ------------------------------ */
export * from 'kafkajs'
/* ----------------------------- Custom Modules ----------------------------- */
import ProducerFactory from './classes/Producer'
import ConsumerFactory from './classes/Consumer'
/* -------------------------------------------------------------------------- */

export * from './libs/interface'

export { ProducerFactory, ConsumerFactory }
