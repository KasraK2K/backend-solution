export const codeToStatusCode = (code: number): number => {
  let statusCode: number

  switch (code) {
    case 0:
      statusCode = 200
      break

    case 1:
      statusCode = 499
      break

    case 2:
      statusCode = 500
      break

    case 3:
      statusCode = 400
      break

    case 4:
      statusCode = 504
      break

    case 5:
      statusCode = 404
      break

    case 6:
      statusCode = 409
      break

    case 7:
      statusCode = 403
      break

    case 8:
      statusCode = 429
      break

    case 9:
      statusCode = 400
      break

    case 10:
      statusCode = 409
      break

    case 11:
      statusCode = 400
      break

    case 12:
      statusCode = 501
      break

    case 13:
      statusCode = 500
      break

    case 14:
      statusCode = 503
      break

    case 15:
      statusCode = 500
      break

    case 16:
      statusCode = 401
      break

    default:
      statusCode = 500
      break
  }

  return statusCode
}
