/* ------------------------------ Node Modules ------------------------------ */
import { basename } from 'node:path'
/* ------------------------------ Dependencies ------------------------------ */
import _ from 'lodash'
/* ----------------------------- Custom Modules ----------------------------- */
import AppError, { IErrorOpt } from './AppError'
import errorFilePath from './errorFilePath'
import logger from '../logger.helper'
import colour from '../../utils/logColour.util'
/* -------------------------------------------------------------------------- */

const errorHandler = (code: number | string, opt?: IErrorOpt): AppError => {
  // Fill needed Constants
  const {
    status: defaultStatus,
    label: defaultLabel,
    message: defaultMessage,
  } = getErrorObject(code)!

  const optObject: IErrorOpt = _.assign(opt, {
    status: opt?.status ?? defaultStatus,
    label: opt?.label ?? defaultLabel,
    code,
    message: opt?.message ?? defaultMessage,
  })

  const error = new AppError(optObject)
  const errorFilePaths = errorFilePath(error)
  error.file =
    process.env.NODE_ENV !== 'production'
      ? {
          name: errorFilePaths.file_name,
          path: errorFilePaths.file_path,
        }
      : undefined

  const logObject: Record<string, any> = {
    success: false,
    ..._.omit(error, ['batch_messages']),
    file: {
      name: errorFilePaths.file_name,
      path: errorFilePaths.file_path,
    },
  }

  error.batch_messages &&
    error.batch_messages.length &&
    (logObject.batch_messages = error.batch_messages)

  logger.info(colour.magenta(error.message), {
    dest: basename(__filename),
    error: logObject,
  })
  console.log(logObject)

  return error
}

type IStatusMapKey = string | number

interface IStatusMapObject {
  status: number
  label: string
  message: string
}

const SERVER_ERROR = 'Internal Server Error'

// prettier-ignore
const statusMap = new Map<IStatusMapKey, IStatusMapObject>([
  /* ----------------------------- Original Errors ---------------------------- */
  [400, { status: 400, label: 'BAD_REQUEST',                      message: 'The server cannot or will not process the request due to something that is perceived to be a client error.' }],
  [401, { status: 401, label: 'UNAUTHORIZED',                     message: 'The client must authenticate itself to get the requested response.' }],
  [403, { status: 403, label: 'FORBIDDEN',                        message: 'The client does not have access rights to the content.' }],
  [404, { status: 404, label: 'NOT_FOUND',                        message: 'The server cannot find the requested resource.' }],
  [405, { status: 405, label: 'METHOD_NOT_ALLOWED',               message: 'The request method is known by the server but is not supported by the target resource.' }],
  [406, { status: 406, label: 'NOT_ACCEPTABLE',                   message: 'The server doesn’t find any content that conforms to the criteria given by the user agent' }],
  [409, { status: 409, label: 'CONFLICT',                         message: 'Request conflicts with the current state of the server.' }],
  [410, { status: 410, label: 'GONE',                             message: 'The requested content has been permanently deleted from server, with no forwarding address.' }],
  [413, { status: 413, label: 'PAYLOAD_TOO_LARGE',                message: 'Request entity is larger than limits defined by server.' }],
  [414, { status: 414, label: 'URI_TOO_LONG',                     message: 'The URI requested by the client is longer than the server is willing to interpret.' }],
  [415, { status: 415, label: 'UNSUPPORTED_MEDIA_TYPE',           message: 'The media format of the requested data is not supported by the server.' }],
  [429, { status: 429, label: 'TOO_MANY_REQUESTS',                message: 'The user has sent too many requests in a given amount of time ("rate limiting").' }],
  [500, { status: 500, label: 'INTERNAL_SERVER_ERROR',            message: 'The server has encountered a situation it does not know how to handle.' }],
  [502, { status: 502, label: 'BAD_GATEWAY',                      message: 'That the server, while working as a gateway to get a response needed to handle the request, got an invalid response.' }],
  [503, { status: 503, label: 'SERVICE_UNAVAILABLE',              message: 'The server is not ready to handle the request.' }],
  [504, { status: 504, label: 'GATEWAY_TIMEOUT',                  message: 'The server is acting as a gateway and cannot get a response in time.' }],
  [511, { status: 511, label: 'NETWORK_AUTHENTICATION_REQUIRED',  message: 'Indicates that the client needs to authenticate to gain network access' }],
  /* ------------------------------ String Errors ----------------------------- */
  ["P2002",                           { status: 400, label: 'P2002',                            message: 'Unique constraint failed' }],
  ["P2025",                           { status: 500, label: 'P2025',                            message: 'Record to update not found' }],
  ["23505",                           { status: 500, label: '23505',                            message: 'Unique key is already exist' }],
  ["42P01",                           { status: 500, label: '42P01',                            message: "Database Column Not Found" }],
  ["42703",                           { status: 500, label: '42P01',                            message: "Database Column Not Found" }],
  ["42804",                           { status: 500, label: '42804',                            message: "Argument of WHERE must be type boolean, not type character varying" }],
  ["42601",                           { status: 500, label: '42601',                            message: "Query syntax error" }],
  ["22P02",                           { status: 500, label: '22P02',                            message: "Invalid input value for enum" }],
  ["28P01",                           { status: 500, label: '28P01',                            message: "Database password authentication failed" }],
  ["ECONNREFUSED",                    { status: 500, label: 'ECONNREFUSED',                     message: "Connection Refused" }],
  ["WRONG_ERROR_CODE",                { status: 500, label: 'WRONG_ERROR_CODE',                 message: "Error Code is not a valid" }],
  ["KafkaJSError",                    { status: 500, label: 'KAFKA_DISCONNECTED_ERROR',         message: "The producer is disconnected" }],
  ["KafkaJSNumberOfRetriesExceeded",  { status: 500, label: 'KAFKA_NUMBER_OF_RETRIES_EXCEEDED', message: "Cannot connect kafka" }],
  /* ----------------------------- Custome Errors ----------------------------- */
  [1000, { status: 500, label: 'CODE_NOT_VALID',                message: "Error Code is not a valid", }],
  [1001, { status: 500, label: 'STATUS_NOT_VALID',              message: "Status Code is not a valid", }],
  [1002, { status: 400, label: 'CUSTOM_ERROR',                  message: "Custome Error happening", }],
  [1003, { status: 429, label: 'TOO_MANY_REQUEST',              message: "Too Many Requests", }],
  [1004, { status: 400, label: 'FAILD_EXTEND_MULTIPART_HEADER', message: "Error on extending multipart header", }],
  [1005, { status: 400, label: 'UPLOAD_ERROR',                  message: "Error on uploading file", }],
  [1006, { status: 400, label: 'WRONG_MIMETYPE',                message: "MimeType is not valid", }],
  [1007, { status: 400, label: 'UPLOAD_TYPE_NOT_VALID',         message: "Upload Type not found", }],
  [1008, { status: 400, label: 'UPLOAD_ID_NOT_FOUND',           message: "Upload ID not found", }],
  [1009, { status: 400, label: 'LIMIT_UPLOAD_FILE_COUNT',       message: "Uploaded more than max files", }],
  [1010, { status: 401, label: 'TOKEN_INVALID',                 message: "Token invalid", }],
  [1011, { status: 400, label: 'TOKEN_MISSING',                 message: "Token missing", }],
  [1012, { status: 400, label: 'API_KEY_MISSING',               message: "Api Key missing", }],
  [1013, { status: 401, label: 'API_KEY_INVALID',               message: "Api Key invalid", }],
  [1014, { status: 405, label: 'METHOD_NOT_ALLOWED',            message: "Method not allowed", }],

])

const getErrorObject = (error_code: number | string) => {
  return statusMap.has(error_code) ? statusMap.get(error_code) : statusMap.get(500)
}

export default errorHandler
