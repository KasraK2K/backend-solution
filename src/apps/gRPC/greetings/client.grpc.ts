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

/* SECTION ------------------- Register Functions --------------------------- */
export const helloClient = (): Record<string, any> => {
  const client = new grpcObj.Greeter(process.env.GRPC_ADDRESS, grpc.credentials.createInsecure())

  return new Promise((resolve, reject) => {
    client.sayHello({ name: 'Kasra' }, (error, result) => (error ? reject(error) : resolve(result)))
  })
}
/* -------------------------------------------------------------------------- */

/* ------------------------------ Start Client ------------------------------ */
// NOTE: Just use for foreign servers
/* -------------------------------------------------------------------------- */
const startGreetingClient = () => {
  grpcServer.bindAsync(
    process.env.GRPC_ADDRESS,
    grpc.ServerCredentials.createInsecure(),
    (error, _port) => {
      if (error) console.log(error)
      console.log(
        `${colour.love('gRPC Client')} running on:\t\t ${colour.green.underline(
          `${process.env.GRPC_ADDRESS}`
        )}`
      )
      grpcServer.start()
    }
  )
}
/* -------------------------------------------------------------------------- */

export default startGreetingClient
