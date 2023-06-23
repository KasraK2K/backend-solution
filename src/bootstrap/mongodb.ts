//====================================================================
//
//  ###    ###   #####   ##     ##   ####     #####   ####    #####
//  ## #  # ##  ##   ##  ####   ##  ##       ##   ##  ##  ##  ##  ##
//  ##  ##  ##  ##   ##  ##  ## ##  ##  ###  ##   ##  ##  ##  #####
//  ##      ##  ##   ##  ##    ###  ##   ##  ##   ##  ##  ##  ##  ##
//  ##      ##   #####   ##     ##   ####     #####   ####    #####
//
//====================================================================

/* ------------------------------ Dependencies ------------------------------ */
import { MongoClient } from 'mongodb'
import config from 'config'
/* ----------------------------- Custom Modules ----------------------------- */
import { IMongodbConfig } from '../../config/config.interface'
/* -------------------------------------------------------------------------- */

const mongodbConfig: IMongodbConfig = config.get('database.mongodb')
const mongoClient: MongoClient = new MongoClient(mongodbConfig.uri)
const mongo = {
  mongoClient,
  database: (databaseName = mongodbConfig.name) => mongoClient.db(databaseName),
  collection: (collectionName = mongodbConfig.default_collection) =>
    mongoClient.db(mongodbConfig.name).collection(collectionName),
}

export default mongo
