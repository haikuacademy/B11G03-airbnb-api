import { Router } from 'express'
const router = Router()

import db from '../db.js'

router.get('/bookings', async (req, res) => {
  let sort = req.query.sort || 'booking_start_date'
  let order = req.query.order || 'DESC'
  let userRangeStart = req.query.user || 0
  let userRangeEnd = req.query.user || 10000000000
  try {
    const { rows } = await db.query(
      `SELECT * FROM bookings WHERE user_id BETWEEN ${userRangeStart} AND ${userRangeEnd} ORDER BY ${sort} ${order}`
    )
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
    const result = rows[0]
    if (result === undefined) {
      throw new Error(`Booking not found with ${req.params.bookingID}`)
    }
    res.json(result)
  } catch (err) {
    console.error(err.message)
    res.json(`Error:${err.message}`)
  }
})

export default router
