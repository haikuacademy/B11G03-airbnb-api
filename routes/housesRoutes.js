import { Router } from 'express'
import db from '../db.js'

const router = Router()

// CREATE
router.post('/houses', async (req, res) => {
  const {
    location,
    bedrooms,
    bathrooms,
    description,
    price_per_night,
    host_id
  } = req.body
  try {
    const insertion =
      await db.query(` INSERT INTO houses (location, bedrooms, bathrooms, description, price_per_night, host_id)
    VALUES ('${location}', ${bedrooms}, ${bathrooms}, '${description}', ${price_per_night}, ${host_id})
RETURNING *`)
    res.json(insertion.rows[0])
  } catch (err) {
    res.send(`Error: ${err.message}`)
  }
})

// READ (ALL)
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

// READ (ONE)
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
    res.send(`Error: ${err.message}`)
  }
})

// UPDATE
router.patch('/houses/:houseId', async (req, res) => {
  let houseId = req.params.houseId
  try {
    const { rows } = await db.query(
      `UPDATE houses
    SET location = '${req.body.location}', bedrooms = ${req.body.bedrooms},
    bathrooms = ${req.body.bathrooms}, description = '${req.body.description}',
    price_per_night = ${req.body.price_per_night}, host_id = ${req.body.host_id}
    WHERE house_id = ${req.params.houseId}
    RETURNING *`
    )
    const result = rows[0]
    if (result === undefined) {
      throw new Error(`No house found with ID ${houseId}`)
    }
    res.json(result)
  } catch (err) {
    res.send(`Error: ${err.message}`)
  }
})

export default router
