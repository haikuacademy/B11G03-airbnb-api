// Packages
import { Router } from 'express'
import db from '../db.js'

const router = Router()

// Define a GET route for fetching the list of houses
router.get('/houses', async (req, res) => {
  let location = req.query.location || ''
  let max_price = req.query.max_price || 10000000000
  let min_rooms = req.query.min_rooms || 0
  let search = req.query.search || ''
  let sort = req.query.sort || 'house_id'
  let order = req.query.order || 'ASC'
  try {
    const { rows } = await db.query(
      `SELECT * FROM houses WHERE location iLIKE '%${location}%' AND price_per_night <= ${max_price} AND bedrooms >= ${min_rooms} AND description iLIKE '%${search}%' ORDER BY ${sort} ${order}`
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
