/* ------------------------------ Dependencies ------------------------------ */
import CryptoJS from 'crypto-js'
/* -------------------------------------------------------------------------- */

/* NOTE --------------------------------------------------------------------- */
/*                                 How To Use                                 */
/* -------------------------------------------------------------------------- */
// import cryptoJS from 'src/common/utils/crypto.util'

// const text = 'Sample Text'
// const encryptedText = cryptoJS.encrypt(text)
// const decryptedText = cryptoJS.decrypt(cypheredText)
/* -------------------------------------------------------------------------- */

class Crypto {
  public encrypt(text: string): string {
    return CryptoJS.AES.encrypt(text, String(process.env.ENCRYPTION_SECRET)).toString()
  }

  public decrypt(encryptedText: string) {
    return CryptoJS.AES.decrypt(encryptedText, String(process.env.ENCRYPTION_SECRET)).toString(
      CryptoJS.enc.Utf8
    )
  }
}

export default new Crypto()
