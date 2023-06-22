/* ------------------------------ Dependencies ------------------------------ */
import express from 'express'
/* ----------------------------- Custom Modules ----------------------------- */
import generalRouter from '../modules/generals/general.routes'
/* -------------------------------------------------------------------------- */

const router = express.Router()

/* ------------------------------- Controllers ------------------------------ */
router.use('/general', generalRouter)
/* -------------------------------------------------------------------------- */

export default router
