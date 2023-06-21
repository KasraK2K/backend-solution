import express from 'express'
const router = express.Router()

/* ------------------------------- Controllers ------------------------------ */
import generalController from '../modules/generals/general.controller'
/* -------------------------------------------------------------------------- */

router.get('/', generalController.checkHealth)

export default router
