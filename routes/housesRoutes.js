// Packages
import { Router } from 'express'
import db from '../db.js'

const router = Router()

// Define a GET route for fetching the list of houses
router.get('/houses', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM houses')
    console.log(rows)
    res.json(rows) // respond with data
  } catch (err) {
    console.error(err.message)
    res.json(err)
  }
})

// Define a GET route for fetching a single house
router.get('/houses/1', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM houses WHERE house_id = 1')
    console.log(rows)
    res.json(rows)
  } catch (err) {
    console.error(err.message)
    res.json(err)
  }
})

// Export the router
export default router
