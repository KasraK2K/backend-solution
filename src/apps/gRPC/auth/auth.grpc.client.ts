/* ------------------------------ Dependencies ------------------------------ */
import { resolve } from 'node:path'
/* ----------------------------- Custom Modules ----------------------------- */
import { grpc, loaderOptions, protoLoader } from '..'
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                 How To Use                                 */
/* -------------------------------------------------------------------------- */
// login({ email: 'Kasra_K2K@yahoo.com', password: '12345678' })
//   .then(console.log)
//   .catch(console.log)

// register({ email: 'Kadra_K2K@yahoo.com', password: '12345678' })
//     .then(console.log)
//     .catch(console.log)
/* -------------------------------------------------------------------------- */

/* -------------------------------- Constants ------------------------------- */
const PROTO_PATH = resolve(process.cwd(), 'src/apps/gRPC/auth/proto/auth.proto')
const packageDef = protoLoader.loadSync(PROTO_PATH, loaderOptions)
const grpcObj = grpc.loadPackageDefinition(packageDef)
/* -------------------------------------------------------------------------- */

/* SECTION ------------------- Register Functions --------------------------- */
export const login = (args: { email: string; password: string }): Record<string, any> => {
  const client = new grpcObj.Auth(process.env.GRPC_ADDRESS, grpc.credentials.createInsecure())

  return new Promise((resolve, reject) => {
    client.login(args, (error, result) => (error ? reject(error) : resolve(result)))
  })
}

export const register = (args: { email: string; password: string }): Record<string, any> => {
  const client = new grpcObj.Auth(process.env.GRPC_ADDRESS, grpc.credentials.createInsecure())

  return new Promise((resolve, reject) => {
    client.register(args, (error, result) => (error ? reject(error) : resolve(result)))
  })
}
/* -------------------------------------------------------------------------- */
