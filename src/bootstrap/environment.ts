//=========================================================================================
//
//  #####  ##     ##  ##   ##  ##  #####    #####  ###    ###  #####  ##     ##  ######
//  ##     ####   ##  ##   ##  ##  ##  ##   ##     ## #  # ##  ##     ####   ##    ##
//  #####  ##  ## ##  ##   ##  ##  #####    #####  ##  ##  ##  #####  ##  ## ##    ##
//  ##     ##    ###   ## ##   ##  ##  ##   ##     ##      ##  ##     ##    ###    ##
//  #####  ##     ##    ###    ##  ##   ##  #####  ##      ##  #####  ##     ##    ##
//
//=========================================================================================

import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'

const env = dotenv.config({ path: `.env.${process.env.NODE_ENV}` })
dotenvExpand.expand(env)
