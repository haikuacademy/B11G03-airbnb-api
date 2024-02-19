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

router.get('/bookings/:bookingID', async (req, res) => {
  try {
    const { rows } = await db.query(
      `SELECT * FROM bookings WHERE booking_id = ${req.params.bookingID}`
    )
    const returnObject =
      rows.length > 0 ? rows[0] : { error: 'booking not found' }
    res.json(returnObject)
  } catch (err) {
    console.error(err.message)
    res.json(err)
  }
})

export default router
