//=======================================================================================================================================================
//
//   ####  #####  #####    ##   ##  #####  #####          ##  ##     ##  #####   #####   #####    ###    ###    ###    ######  ##   #####   ##     ##
//  ##     ##     ##  ##   ##   ##  ##     ##  ##         ##  ####   ##  ##     ##   ##  ##  ##   ## #  # ##   ## ##     ##    ##  ##   ##  ####   ##
//   ###   #####  #####    ##   ##  #####  #####          ##  ##  ## ##  #####  ##   ##  #####    ##  ##  ##  ##   ##    ##    ##  ##   ##  ##  ## ##
//     ##  ##     ##  ##    ## ##   ##     ##  ##         ##  ##    ###  ##     ##   ##  ##  ##   ##      ##  #######    ##    ##  ##   ##  ##    ###
//  ####   #####  ##   ##    ###    #####  ##   ##        ##  ##     ##  ##      #####   ##   ##  ##      ##  ##   ##    ##    ##   #####   ##     ##
//
//=======================================================================================================================================================

/* ------------------------------ Node Modules ------------------------------ */
import os from 'node:os'
/* ------------------------------ Dependencies ------------------------------ */
import config from 'config'
/* ----------------------------- Custom Modules ----------------------------- */
import { IApplicationConfig } from '../../../config/config.interface'
import tokenHelper from './token.helper'
import colour from '../../common/utils/logColour.util'
/* -------------------------------------------------------------------------- */

const appConfig: IApplicationConfig = config.get('application')

export const printInformation = (port: string) => {
  if (appConfig.information) {
    console.group('Server Information:')
    console.table([
      {
        Port: port,
        NODE_ENV: process.env.NODE_ENV,
        Platform: os.platform(),
        'CPU Model': os.cpus()[0].model,
        Arch: os.arch(),
      },
    ])
    console.groupEnd()
    // CPU/Ram Information
    console.group('\nCPU/Ram Information:')
    console.table([
      {
        'CPU Count': os.cpus().length,
        'CPU Speed': os.cpus()[0].speed,
        'Total Memory': os.totalmem(),
        'Free Memory': os.freemem(),
        'Used Memory': os.totalmem() - os.freemem(),
      },
    ])
    console.groupEnd()
    // Node Information
    console.group('\nNode Information:')
    console.table([
      {
        'Node PID': process.pid,
        'Node CPU Usage': process.cpuUsage(),
        'Node Version': process.version,
        'Node Exec Path': process.execPath,
      },
    ])
    console.groupEnd()

    const payload = { id: 1 }
    const cryptoToken = tokenHelper.sign(payload)

    console.log('\n- Crypto Token ----------------------------------------------------------')
    console.info(cryptoToken)

    console.log('\n- Api Key ---------------------------------------------------------------')
    console.info(process.env.API_KEY, '\n')
  }

  console.log(
    `${colour.love('HTTP Server')} running on:\t\t ${colour.green.underline(
      process.env.SERVER_ADDRESS
    )}`
  )
  console.log(
    `${colour.love('Swagger')} running on:\t\t ${colour.green.underline(
      `${process.env.SERVER_ADDRESS}/swagger`
    )}`
  )
}
