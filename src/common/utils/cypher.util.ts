import CryptoJS from 'crypto-js'

/* -------------------------------------------------------------------------- */
/*                                 How To Use                                 */
/* -------------------------------------------------------------------------- */
// import cryptoJS from 'src/common/utils/cypher.util'

// const text = 'Sample Text'
// const cypheredText = cryptoJS.textToCypher(text)
// const cypherToText = cryptoJS.cypherToText(cypheredText)
/* -------------------------------------------------------------------------- */

class Cypher {
  public textToCypher(text: string): string {
    return CryptoJS.AES.encrypt(text, String(process.env.ENCRYPTION_SECRET)).toString()
  }

  public cypherToText(cypher: string) {
    return CryptoJS.AES.decrypt(cypher, String(process.env.ENCRYPTION_SECRET)).toString(
      CryptoJS.enc.Utf8
    )
  }
}

export default new Cypher()
