import { Router } from 'express'
import db from '../db.js'
import bcrypt from 'bcrypt'

const router = Router()

// READ (ALL)
router.get('/users', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM users')
    console.log(rows)
    res.json(rows)
  } catch (err) {
    console.error(err.message)
    res.json(err)
  }
})

// READ (ONE)
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

// UPDATE
router.patch('/users/:user_id', async (req, res) => {
  try {
    const user_id = req.params.user_id
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
    let profile_pic_url = req.profile_pic_url || readObj.profile_pic_url
    let password
    if (!req.body.password) {
      password = readObj.password
    } else {
      const plaintextPassword = req.body.password
      const salt = await bcrypt.genSalt(10)
      password = await bcrypt.hash(plaintextPassword, salt)
    }
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

export default router
