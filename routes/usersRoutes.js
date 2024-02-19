// Packages
import { Router } from 'express'
import db from '../db.js'

const router = Router()

// Define a GET route for fetching the list of users
router.get('/users', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM users')
    console.log(rows)
    res.json(rows) // respond with data
  } catch (err) {
    console.error(err.message)
    res.json(err)
  }
})

// Fetching a user using request params
router.get('/users/:userId', async (req, res) => {
  let userId = req.params.userId
  try {
    const { rows } = await db.query(
      `SELECT * FROM users WHERE user_id = ${userId}`
    )
    console.log(rows)
    const result = rows[0]
    console.log(result)
    if (result === undefined) {
      res.json({ Error: 'User Not Found' })
    }
    res.json(result)
  } catch (err) {
    console.error(err.message)
    res.json(err)
  }
})

// Export the router
export default router
