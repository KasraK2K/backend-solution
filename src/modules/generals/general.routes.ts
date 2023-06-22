import express from 'express'
const router = express.Router()

/* ------------------------------- Controllers ------------------------------ */
import generalController from '../generals/general.controller'
/* -------------------------------------------------------------------------- */

router.get('/health-check', generalController.healthCheck)

export default router
