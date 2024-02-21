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

router.patch('/users/:user_id', async (req, res) => {
  try {
    const { rows } = await db.query(`
    UPDATE users
    SET first_name = '${req.params.first_name}', last_name = '${req.params.last_name}', email = '${req.params.email}',
     password = '${req.params.password}', profile_pic_url = '${req.params.profile_pic_url}'
    WHERE user_id = ${req.params.user_id}
    RETURNING *
  `)
    console.log(rows)
    const result = rows[0]
    console.log(result)
    res.json(result)
  } catch (err) {
    console.log(err.message)
    res.json(err)
  }
})

// Export the router
export default router
