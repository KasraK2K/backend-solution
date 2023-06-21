import express from 'express'
const router = express.Router()
/* -------------------------------------------------------------------------- */

router.get('/', (_, res) => {
  // errorHandler({ statusCode: 404 })
  return res.json({ message: 'hi' })
})

export default router
