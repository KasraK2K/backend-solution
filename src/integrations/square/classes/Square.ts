import { Client, Environment, SquareAuth, SquareCatalog } from '..'

/* -------------------------------------------------------------------------- */
/*                                 How to Use                                 */
/* -------------------------------------------------------------------------- */
// const square = new Square()
/* -------------------------------------------------------------------------- */

class Square {
  public certificate = require('../certificate.json')
  public basePath =
    process.env.NODE_ENV === 'production'
      ? 'https://connect.squareup.com'
      : 'https://connect.squareupsandbox.com'
  public environment =
    process.env.NODE_ENV === 'production' ? Environment.Production : Environment.Sandbox
  public client = new Client({
    environment: this.environment,
    accessToken: this.certificate.access_token,
  })

  public auth = new SquareAuth(this)
  public catalog = new SquareCatalog(this)
}

export default Square
