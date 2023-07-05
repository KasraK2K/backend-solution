/* ----------------------------- Custom Modules ----------------------------- */
import Stripe from './classes/Stripe'
import StripeCharges from './classes/StripeCharges'
import devCertificate from './certificate.dev.json'
import prodCertificate from './certificate.prod.json'
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                 How To Use                                 */
/* -------------------------------------------------------------------------- */
/*
  1. Import and create stripe instance
  2. If user created before get user and find it stripe_id but if it's new create stripe customer and use it ID
  3. Create ephemeral key
  4. Now create payment params and use paymentIntents
*/

// import Stripe from "src/integrations/stripe"
// const stripeInstance = new Stripe()
// const stripeObj = stripeInstance.stripeObj
// const customer = await stripeObj.customers.create()
// const ephemeralKey = await stripeObj.ephemeralKeys.create({ customer: customer.id }, { apiVersion: '2019-05-16' })
// const params = {
//   amount: Math.round(__AMOUNT_NUMBER__ * 100),
//   currency: 'gbp',
//   customer: ustomer.id,
//   automatic_payment_methods: {enabled: true,},
// }
// stripeObj
//   .paymentIntents
//   .create(params)
//   .then((response) => {
//     resolve({
//       paymentIntent: response.client_secret,
//       ephemeralKey: ephemeralKey.secret,
//       customer: customerId,
//       publishableKey: stripeInstance.publishable_key,
//     })
//   })
//   .catch((err) => {
//     console.error(err)
//     const error_message = stripeInstance.getErrorMessage(err)
//     const error = errorHandler(500, { status: 500, message: error_message })
//     return reject(error)
//   })
/* -------------------------------------------------------------------------- */

/* -------------------------------- Constants ------------------------------- */
const certificate = process.env.NODE_ENV === 'development' ? devCertificate : prodCertificate
/* -------------------------------------------------------------------------- */

export * from './libs/interface'
export { certificate }
export { Stripe }
export { StripeCharges }
