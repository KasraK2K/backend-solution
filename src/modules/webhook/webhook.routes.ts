/* ------------------------------ Dependencies ------------------------------ */
import express from 'express'
/* -------------------------------------------------------------------------- */

/* -------------------------------- Constants ------------------------------- */
const router = express.Router()
/* -------------------------------------------------------------------------- */

/* ------------------------------- Controllers ------------------------------ */
import webhookController from './webhook.controller'
/* -------------------------------------------------------------------------- */

router.get('/square/auth/callback', webhookController.squareAuthCallback)

export default router
