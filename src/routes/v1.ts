/* ------------------------------ Dependencies ------------------------------ */
import express from 'express'
/* ----------------------------- Custom Modules ----------------------------- */
import generalRouter from '../modules/generals/general.routes'
import authRouter from '../modules/auth/auth.routes'
/* -------------------------------------------------------------------------- */

const router = express.Router()

/* --------------------------------- Modules -------------------------------- */
router.use('/general', generalRouter)
router.use('/auth', authRouter)
/* -------------------------------------------------------------------------- */

export default router
