import { Router } from 'express'
const router = Router()

import db from '../db.js'

router.get('/bookings', (req, res) => {
  res.json([
    { houseid: 1, userid: 3 },
    { houseid: 2, userid: 4 },
    { houseid: 3, userid: 5 }
  ])
})

router.get('/bookings/1', (req, res) => {
  res.json({ houseid: 1, userid: 3 })
})

export default router
