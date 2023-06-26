/* ------------------------------ Dependencies ------------------------------ */
import express from 'express'
/* ----------------------------- Custom Modules ----------------------------- */
import responseCache from '../../common/helpers/cache.helper'
/* -------------------------------- Constants ------------------------------- */
const router = express.Router()
/* -------------------------------------------------------------------------- */

/* ------------------------------- Controllers ------------------------------ */
import generalController from '../generals/general.controller'
/* -------------------------------------------------------------------------- */

router.all('/health-check', generalController.healthCheck)

export default router
