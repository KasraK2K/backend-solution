/* ----------------------------- Custom Modules ----------------------------- */
import { io } from '../../application'
import colour from '../../common/utils/logColour.util'
/* ----------------------------- Events Handler ----------------------------- */
import { connectionEvent } from './events/connection.handler'
/* -------------------------------------------------------------------------- */

const events = [{ name: 'connection', callback: connectionEvent }]

const registerSocketServer = () => {
  for (const event of events) {
    io.sockets.on(event.name, (socket) => {
      event.callback(socket)
    })
  }

  console.log(
    `${colour.love('Socket.io Server')} running on:\t ${colour.green.underline(
      process.env.SERVER_ADDRESS
    )}`
  )
}

export default registerSocketServer
