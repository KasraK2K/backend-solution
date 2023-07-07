/* ------------------------------ Dependencies ------------------------------ */
export const grpc = require('@grpc/grpc-js')
export const protoLoader = require('@grpc/proto-loader')
/* ----------------------------- Custom Modules ----------------------------- */
import colour from '../../common/utils/logColour.util'
/* -------------------------------------------------------------------------- */

/* -------------------------------- Constants ------------------------------- */
export const grpcServer = new grpc.Server()

export const loaderOptions = {
  keepCase: true, // instructs the protoLoader to maintain protobuf field names
  longs: String, // store the data types that represent long and enum values
  enums: String, // store the data types that represent long and enum values
  defaults: true, // when set to true, sets default values for output objects
  oneofs: true, // sets virtual oneof properties to field names
}
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                  Services                                  */
/* -------------------------------------------------------------------------- */
// SECTION : Import all services here
/* -------------------------------------------------------------------------- */
import './auth/auth.grpc.service'
/* -------------------------------------------------------------------------- */

/* ------------------------------ Start Client ------------------------------ */
// NOTE: Listen to server when it is on different port of server gRPC
/* -------------------------------------------------------------------------- */
// export const startGrpcClient = () => {
//   grpcServer.bindAsync(
//     process.env.GRPC_ADDRESS,
//     grpc.ServerCredentials.createInsecure(),
//     (error, _port) => {
//       if (error) console.log(error)
//       console.log(
//         `${colour.love('gRPC Client')} running on:\t\t ${colour.green.underline(
//           `${process.env.GRPC_ADDRESS}`
//         )}`
//       )
//       grpcServer.start()
//     }
//   )
// }
/* -------------------------------------------------------------------------- */

/* ------------------------------ Start Server ------------------------------ */
export const startGrpcServer = () => {
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
