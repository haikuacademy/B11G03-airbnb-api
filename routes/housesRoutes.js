// Packages
import { Router } from 'express'
import db from '../db.js'

const router = Router()

// Define a GET route for fetching the list of houses
router.get('/houses', async (req, res) => {
  let location
  if (!req.query.location) {
    location = ''
  } else {
    location = req.query.location
  }
  let max_price
  if (!req.query.max_price) {
    max_price = 10000000000
  } else {
    max_price = req.query.max_price
  }
  if (!req.query.min_prices) {
  }
  let min_rooms
  if (!req.query.min_rooms) {
    min_rooms = 0
  } else {
    min_rooms = req.query.min_rooms
  }
  let search
  if (!req.query.search) {
    search = ''
  } else {
    search = req.query.search
  }
  let sort
  if (!req.query.sort) {
    sort = 'house_id'
  } else {
    sort = req.query.sort
  }
  let order
  if (!req.query.order) {
    order = 'ASC'
  } else {
    order = req.query.order
  }
  req.query.order
  console.log(search)
  try {
    const { rows } = await db.query(
      `SELECT * FROM houses WHERE location iLIKE '%${location}%' AND price_per_night <= ` +
        max_price +
        ` AND bedrooms >= ` +
        min_rooms +
        ` AND description iLIKE '%${search}%' ORDER BY ${sort} ${order}`
    )
    console.log(rows)
    res.json(rows)
  } catch (err) {
    console.error(err.message)
    res.json(err)
  }
})

// Fetching a house using request params
router.get('/houses/:houseId', async (req, res) => {
  let houseId = req.params.houseId
  try {
    const { rows } = await db.query(
      `SELECT * FROM houses WHERE house_id = ${houseId}`
    )
    const result = rows[0]
    console.log(result)
    if (result === undefined) {
      res.json({ Error: 'House Not Found' })
    }
    res.json(result)
  } catch (err) {
    console.error(err.message)
    res.json(err)
  }
})
// Export the router
export default router
