/* ------------------------------ Dependencies ------------------------------ */
import stripe from 'stripe'
/* ----------------------------- Custom Modules ----------------------------- */
import { StripeCharges, certificate } from '..'
/* -------------------------------------------------------------------------- */

class Stripe {
  public stripeObj = new stripe(certificate.secret_key, { apiVersion: '2022-11-15' })
  // public publishable_key = certificate.publishable_key
  public stripeCharges = new StripeCharges(this)

  public getErrorMessage = (error: { type: string; message: string }): string => {
    let errorMessage: string
    switch (error.type) {
      case 'StripeCardError':
        errorMessage = `A payment error occurred: ${error.message}`
        break

      case 'StripeInvalidRequestError':
        errorMessage = 'An invalid request occurred.'
        break

      case 'StripeRateLimitError':
        errorMessage = 'Too many requests made to the API too quickly'
        break

      case 'StripeAPIError':
        errorMessage = "An error occurred internally with Stripe's API"
        break

      case 'StripeConnectionError':
        errorMessage = 'Some kind of error occurred during the HTTPS communication'
        break

      case 'StripeAuthenticationError':
        errorMessage = 'You probably used an incorrect API key'
        break

      default:
        console.log('Switch Error Not Handled', error)
        errorMessage = 'Another problem occurred, maybe unrelated to Stripe.'
        break
    }
    return errorMessage
  }
}

export default Stripe
