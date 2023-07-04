//===============================================================================
//
//  #####    #####    #####   ######   ####  ######  #####      ###    #####
//  ##  ##  ##   ##  ##   ##    ##    ##       ##    ##  ##    ## ##   ##  ##
//  #####   ##   ##  ##   ##    ##     ###     ##    #####    ##   ##  #####
//  ##  ##  ##   ##  ##   ##    ##       ##    ##    ##  ##   #######  ##
//  #####    #####    #####     ##    ####     ##    ##   ##  ##   ##  ##
//
//===============================================================================
// This file is loaded directly into the server file to register before another things
//===============================================================================

import 'reflect-metadata'
import './extend'
import './environment'
import './requirements'

import mongoClient from './mongodb'
import postgresPool from './postgresql'
import { createRedisClient } from './redis'
import './cron-jobs/index'
import './rabbitmq-consumers'
import './swagger'
import '../apps/gRPC/server'

// starterConfig.boot.forEach(async (moduleName) => {
//   await import(`./${moduleName}`).catch((err) => console.log(err.message))

//   // ─── MONGODB ────────────────────────────────────────────────────────────────────
//   if (moduleName === "mongodb") {
//     mongoClient.connect((err) => {
//       if (err) {
//         console.error(err)
//         process.exit(1)
//       }
//     })
//   }
// })

export { mongoClient }
export { postgresPool }
export { createRedisClient }
