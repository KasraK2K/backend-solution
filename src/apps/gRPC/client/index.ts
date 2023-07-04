/* ----------------------------- Custom Modules ----------------------------- */
import colour from '../../../common/utils/logColour.util'
import { grpc, grpcServer } from '../constants/grpc.config'
/* -------------------------------------------------------------------------- */

const startGrpcClient = () => {
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

export default startGrpcClient
