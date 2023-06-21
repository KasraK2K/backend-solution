/* --------------------------------- Module --------------------------------- */
import AppError, { IErrorOpt } from './AppError'
import errorFilePath from './errorFilePath'

const errorHandler = (opt: IErrorOpt) => {
  // Fill needed Constants
  const { statusCode, message, batch_messages } = opt
  const { code, message: defaultMessage } = getErrorObject(statusCode)!
  const error = new AppError(opt)
  const errorPaths = errorFilePath(error)
  // Fill Extensions
  error.cause = {
    code,
    statusCode,
    message: message ?? defaultMessage,
    batch_messages,
  }
  error.cause.file =
    process.env.NODE_ENV !== 'production'
      ? {
          file_name: errorPaths.file_name,
          file_path: errorPaths.file_path,
        }
      : undefined
  // TODO : use winston log to create log or send to prometheus
  const logObject: Record<string, any> = {
    success: false,
    code,
    statusCode,
    message: message ?? defaultMessage,
    file: {
      file_name: errorPaths.file_name,
      file_path: errorPaths.file_path,
    },
  }
  batch_messages && batch_messages.length && (logObject.batch_messages = batch_messages)
  console.log(logObject)

  throw error
}

// prettier-ignore
const statusMap = new Map([
  [400, { code: 'BAD_REQUEST', message: 'The server cannot or will not process the request due to something that is perceived to be a client error.' }],
  [401, { code: 'UNAUTHORIZED', message: 'The client must authenticate itself to get the requested response.' }],
  [403, { code: 'FORBIDDEN', message: 'The client does not have access rights to the content.' }],
  [404, { code: 'NOT_FOUND', message: 'The server cannot find the requested resource.' }],
  [405, { code: 'METHOD_NOT_ALLOWED', message: 'The request method is known by the server but is not supported by the target resource.' }],
  [406, { code: 'NOT_ACCEPTABLE', message: 'The server doesn’t find any content that conforms to the criteria given by the user agent' }],
  [409, { code: 'CONFLICT', message: 'Request conflicts with the current state of the server.' }],
  [410, { code: 'GONE', message: 'The requested content has been permanently deleted from server, with no forwarding address.' }],
  [413, { code: 'PAYLOAD_TOO_LARGE', message: 'Request entity is larger than limits defined by server.' }],
  [414, { code: 'URI_TOO_LONG', message: 'The URI requested by the client is longer than the server is willing to interpret.' }],
  [415, { code: 'UNSUPPORTED_MEDIA_TYPE', message: 'The media format of the requested data is not supported by the server.' }],
  [429, { code: 'TOO_MANY_REQUESTS', message: 'The user has sent too many requests in a given amount of time ("rate limiting").' }],
  [500, { code: 'INTERNAL_SERVER_ERROR', message: 'The server has encountered a situation it does not know how to handle.' }],
  [502, { code: 'BAD_GATEWAY', message: 'That the server, while working as a gateway to get a response needed to handle the request, got an invalid response.' }],
  [503, { code: 'SERVICE_UNAVAILABLE', message: 'The server is not ready to handle the request.' }],
  [504, { code: 'GATEWAY_TIMEOUT', message: 'The server is acting as a gateway and cannot get a response in time.' }],
  [511, { code: 'NETWORK_AUTHENTICATION_REQUIRED', message: 'Indicates that the client needs to authenticate to gain network access' }],
])

const getErrorObject = (statusCode: number) => {
  return statusMap.has(statusCode) ? statusMap.get(statusCode) : statusMap.get(500)
}

export default errorHandler
