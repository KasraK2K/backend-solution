//==========================================================================
//
//  #####    #####    ####   ####    ######  #####   ####   #####   ##
//  ##  ##  ##   ##  ##     ##         ##    ##     ##     ##   ##  ##
//  #####   ##   ##   ###   ##  ###    ##    #####   ###   ##   ##  ##
//  ##      ##   ##     ##  ##   ##    ##    ##        ##   #####   ##
//  ##       #####   ####    ####      ##    #####  ####   ##       ######
//
//==========================================================================

/* ------------------------------ Dependencies ------------------------------ */
import pg, { PoolConfig } from 'pg'
import config from 'config'
/* ----------------------------- Custom Modules ----------------------------- */
import { IPostgresConfig } from '../../config/config.interface'
/* -------------------------------------------------------------------------- */

const pgConfig: IPostgresConfig = config.get('database.postgres')
export const poolConfig: PoolConfig = pgConfig
export const pool: pg.Pool = new pg.Pool(poolConfig)

export default {
  pg,
  poolConfig,
  pool,
}
