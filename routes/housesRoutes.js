import { Router } from 'express'
import db from '../db.js'
import jwt from 'jsonwebtoken'
import { jwtSecret } from '../secrets.js'

const router = Router()

// CREATE
router.post('/houses', async (req, res) => {
  try {
    const token = req.cookies.jwt
    if (!token) {
      throw new Error('No token provided')
    } else {
      const decodedToken = jwt.verify(token, jwtSecret)
      if (!decodedToken) {
        throw new Error('Invalid authentication token')
      }
    }
    const {
      location,
      bedrooms,
      bathrooms,
      description,
      price_per_night,
      host_id
    } = req.body
    const insertion =
      await db.query(` INSERT INTO houses (location, bedrooms, bathrooms, description, price_per_night, host_id)
    VALUES ('${location}', ${bedrooms}, ${bathrooms}, '${description}', ${price_per_night}, ${decodedToken.user_id})
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
    const token = req.cookies.jwt
    if (!token) {
      throw new Error('No token provided')
    } else {
      const decodedToken = jwt.verify(token, jwtSecret)
      if (!decodedToken) {
        throw new Error('Invalid authentication token')
      }
    }
    const readRows = await db.query(
      `SELECT * FROM houses WHERE house_id = ${houseId}`
    )
    const readResult = readRows.rows[0]
    if (readResult === undefined) {
      throw new Error(`No house found with ID ${houseId}`)
    }
    const readObj = readRows.rows[0]
    if (decodedToken.user_id !== readObj.host_id) {
      throw new Error('You are not authorized')
    }
    let location = req.body.location || readObj.location
    let bedrooms = req.body.bedrooms || readObj.bedrooms
    let bathrooms = req.body.bathrooms || readObj.bathrooms
    let description = req.body.description || readObj.description
    let price_per_night = req.body.price_per_night || readObj.price_per_night
    const updateRows = await db.query(
      `UPDATE houses
    SET location = '${location}', bedrooms = ${bedrooms},
    bathrooms = ${bathrooms}, description = '${description}',
    price_per_night = ${price_per_night}, host_id = ${decodedToken.user_id}
    WHERE house_id = ${req.params.houseId}
    RETURNING *`
    )
    const updateResult = updateRows.rows[0]
    if (updateResult === undefined) {
      throw new Error(`Unable to update house ID ${houseId}`)
    }
    res.json(updateResult)
  } catch (err) {
    res.send(`Error: ${err.message}`)
  }
})

// DELETE
router.delete('/houses/:houseId', async (req, res) => {
  let houseId = req.params.houseId
  try {
    const token = req.cookies.jwt
    if (!token) {
      throw new Error('No token provided')
    } else {
      const decodedToken = jwt.verify(token, jwtSecret)
      if (!decodedToken) {
        throw new Error('Invalid authentication token')
      }
    }
    const readRows = await db.query(
      `SELECT * FROM houses WHERE house_id = ${houseId}`
    )
    const readResult = readRows.rows[0]
    if (readResult === undefined) {
      throw new Error(`No house found with ID ${houseId}`)
    }
    if (decodedToken.user_id !== readResult.host_id) {
      throw new Error('You are not authorized')
    }
    const deleteRows = await db.query(`
    DELETE FROM houses WHERE house_id = ${req.params.houseId}
  `)
    res.send(`House ID ${houseId} deleted successfully`)
  } catch (err) {
    res.send(`Error: ${err.message}`)
  }
})

export default router
