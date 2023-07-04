/* ------------------------------ Dependencies ------------------------------ */
import { resolve } from 'node:path'
/* ----------------------------- Custom Modules ----------------------------- */
import colour from '../../../common/utils/logColour.util'
import { grpc, grpcServer, loaderOptions, protoLoader } from '../constants/grpc.config'
/* -------------------------------------------------------------------------- */

/* -------------------------------- Constants ------------------------------- */
const PROTO_PATH = resolve(process.cwd(), 'src/apps/gRPC/greetings/proto/helloworld.proto')
const packageDef = protoLoader.loadSync(PROTO_PATH, loaderOptions)
const grpcObj = grpc.loadPackageDefinition(packageDef)
/* -------------------------------------------------------------------------- */

/* SECTION -------------------- Register Services --------------------------- */
grpcServer.addService(grpcObj.Greeter.service, {
  sayHello: (args, callback) => {
    const name = args.request.name
    const message = `message for name: ${name}`
    return !name
      ? callback({
          status: grpc.status.INVALID_ARGUMENT,
          message: 'Name should not be empty string',
        })
      : callback(null, { status: grpc.status.OK, message })
  },
})
/* -------------------------------------------------------------------------- */

/* ------------------------------ Start Server ------------------------------ */
const startGreetingServer = () => {
  grpcServer.bindAsync(
    process.env.GRPC_ADDRESS,
    grpc.ServerCredentials.createInsecure(),
    (error, _port) => {
      if (error) console.log(error)
      console.log(
        `${colour.love('gRPC Greeting Server')} running on: ${colour.green.underline(
          `${process.env.GRPC_ADDRESS}`
        )}`
      )
      grpcServer.start()
    }
  )
}
/* -------------------------------------------------------------------------- */

export default startGreetingServer
