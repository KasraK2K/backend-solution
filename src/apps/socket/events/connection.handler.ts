/* --------------------------- Const Dependencies --------------------------- */
import { Socket } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
/* -------------------------------------------------------------------------- */

const connectionEvent = (
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
  console.log(`socket id: ${socket.id} is connected.`)
}

export default connectionEvent
