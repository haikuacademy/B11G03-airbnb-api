import { Router } from 'express'
import db from '../db.js'

const router = Router()

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
    res.json(rows)
  } catch (err) {
    res.json(err)
  }
})

router.get('/houses/:houseId', async (req, res) => {
  let houseId = req.params.houseId
  try {
    const { rows } = await db.query(
      `SELECT * FROM houses WHERE house_id = ${houseId}`
    )
    const result = rows[0]
    if (result === undefined) {
      throw new Error(`No house found with ID ${houseId}`)
    }
    res.json(result)
  } catch (err) {
    console.log(err.message)
    res.send(`Error: ${err.message}`)
  }
})

export default router
