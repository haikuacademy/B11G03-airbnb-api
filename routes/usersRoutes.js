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
    const readRows = await db.query(
      `SELECT * FROM users WHERE user_id = ${user_id}`
    )
    const readResult = readRows.rows[0]
    if (readResult === undefined) {
      throw new Error(`No user found with ID ${user_id}`)
    }
    const readObj = readRows.rows[0]
    let first_name = req.body.first_name || readObj.first_name
    let last_name = req.body.bedrooms || readObj.last_name
    let email = req.body.email || readObj.email
    let password = req.body.password || readObj.password
    let profile_pic_url = req.profile_pic_url || readObj.profile_pic_url
    const updateRows = await db.query(
      `UPDATE users
    SET first_name = '${first_name}', last_name = '${last_name}',
    email = '${email}', password = '${password}',
    profile_pic_url = '${profile_pic_url}'
    WHERE user_id = ${req.params.user_id}
    RETURNING *`
    )
    const updateResult = updateRows.rows[0]
    if (updateResult === undefined) {
      throw new Error(`Unable to update user ID ${houseId}`)
    }
    res.json(updateResult)
  } catch (err) {
    res.send(`Error: ${err.message}`)
  }
})

// Export the router
export default router
