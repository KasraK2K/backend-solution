/* ------------------------------ Dependencies ------------------------------ */
import BuiltinRequest from 'builtin-request'
/* -------------------------------------------------------------------------- */

/* NOTE --------------------------------------------------------------------- */
/*                                 How To Use                                 */
/* -------------------------------------------------------------------------- */
// import { getRequest } from 'src/common/helpers/request.helper'

// getRequest('jsonplaceholder.typicode.com', '/todos').then(console.log).catch(console.log)
/* ----------------------------------- OR ----------------------------------- */
// import Requester from 'src/common/helpers/request.helper'

// const request = new Requester('jsonplaceholder.typicode.com')
// request.get('/todos').then(console.log).catch(console.log)
/* ----------------------------------- OR ----------------------------------- */
// import Requester from 'src/common/helpers/request.helper'

// const options = {
//   hostname: 'jsonplaceholder.typicode.com',
//   port: 443,
//   path: '/todos',
//   method: 'GET',
// }

// const request = new Requester()
// request.execute(options).then(console.log).catch(console.log)
/* -------------------------------------------------------------------------- */

interface IOpions {
  hostname?: string
  port?: number
  path?: string
  method?: string
}

export const getRequest = (baseUrl: string, path: string) => {
  const request = new BuiltinRequest(baseUrl)
  return request.get(path)
}

export const postRequest = (baseUrl: string, path: string, data: any) => {
  const request = new BuiltinRequest(baseUrl)
  return request.post(path, data)
}

export const putRequest = (baseUrl: string, path: string, data: any) => {
  const request = new BuiltinRequest(baseUrl)
  return request.put(path, data)
}

export const patchRequest = (baseUrl: string, path: string, data: any) => {
  const request = new BuiltinRequest(baseUrl)
  return request.patch(path, data)
}

export const deleteRequest = (baseUrl: string, path: string, data: any) => {
  const request = new BuiltinRequest(baseUrl)
  return request.delete(path, data)
}

class Request {
  private request: BuiltinRequest

  constructor(private baseUrl?: string) {
    this.request = new BuiltinRequest(this.baseUrl)
  }

  execute(options: IOpions) {
    return this.request.execute(options)
  }

  get(path: string) {
    return this.request.get(path)
  }

  post(path: string, data: any) {
    return this.request.post(path, data)
  }

  put(path: string, data: any) {
    return this.request.put(path, data)
  }

  patch(path: string, data: any) {
    return this.request.patch(path, data)
  }

  delete(path: string, data: any) {
    return this.request.delete(path, data)
  }
}

export default Request
