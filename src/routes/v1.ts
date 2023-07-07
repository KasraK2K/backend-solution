/* ------------------------------ Dependencies ------------------------------ */
import express from 'express'
/* ----------------------------- Custom Modules ----------------------------- */
import generalRouter from '../modules/general/general.routes'
import authRouter from '../modules/auth/auth.routes'
import webhookRouter from '../modules/webhook/webhook.routes'
/* -------------------------------------------------------------------------- */

const router = express.Router()

/* --------------------------------- Modules -------------------------------- */
router.use('/general', generalRouter)
router.use('/auth', authRouter)
router.use('/webhook', webhookRouter)
/* -------------------------------------------------------------------------- */

export default router
