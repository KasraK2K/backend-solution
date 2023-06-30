/* ---------------------------------- Boot ---------------------------------- */
import './strategies'
/* ------------------------------ Dependencies ------------------------------ */
import express from 'express'
/* -------------------------------- Constants ------------------------------- */
const router = express.Router()
/* -------------------------------------------------------------------------- */

/* ------------------------------- Controllers ------------------------------ */
import authController from './auth.controller'
/* -------------------------------------------------------------------------- */

router.post('/register-local-user', authController.registerLocalUser)
router.post('/login-local-user', authController.loginLocalUser)

export default router
