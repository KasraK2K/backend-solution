/* ------------------------------ Dependencies ------------------------------ */
import Mailgun from 'mailgun.js'
import formData from 'form-data'
/* ----------------------------- Custom Modules ----------------------------- */
import { Message } from '..'
/* -------------------------------------------------------------------------- */

const mailgun = new Mailgun(formData)

class MailGunJS {
  private certificate = {
    key: '_key_',
    url: 'https://api.eu.mailgun.net',
    from: 'Business Name <info@business_email.com>',
    domain: 'mailer.registered_domain-for_mailgun.com',
  }

  public client = mailgun.client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY || this.certificate.key,
    url: this.certificate.url,
  })

  public message = new Message(this, this.certificate)
}

export default MailGunJS
