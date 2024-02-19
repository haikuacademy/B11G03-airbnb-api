import { Router } from 'express'
const router = Router()

import db from '../db.js'

router.get('/bookings', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM bookings')
    console.log(rows)
    res.json(rows)
  } catch (err) {
    console.error(err.message)
    res.json(err)
  }
})

router.get('/bookings/1', async (req, res) => {
  try {
    const { rows } = await db.query(
      'SELECT * FROM bookings WHERE booking_id = 1'
    )
    const result = rows[0]
    console.log(result)
    res.json(result)
  } catch (err) {
    console.error(err.message)
    res.json(err)
  }
})

export default router
