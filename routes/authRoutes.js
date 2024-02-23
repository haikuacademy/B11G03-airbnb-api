import db from '../db.js'
import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { jwtSecret } from '../secrets.js'
const router = express.Router()

router.post('/signup', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const existingUser = await db.query(`
      SELECT * FROM users
      WHERE email = '${req.body.email}'`)
    if (existingUser.rows.length > 0) {
      throw new Error('User with that email already exists.')
    }
    const insertion = await db.query(`
    INSERT INTO users (first_name, last_name, email, password, profile_pic_url)
    VALUES ('${req.body.first_name}', '${req.body.last_name}', '${req.body.email}', '${hashedPassword}', '${req.body.profile_pic_url}')
    RETURNING *`)
    const readNewUser = await db.query(`
    SELECT * from users WHERE email = '${req.body.email}'`)
    const newUserId = readNewUser.rows[0].user_id
    const newUserEmail = readNewUser.rows[0].email
    const payload = { user_id: newUserId, email: newUserEmail }
    const token = jwt.sign(payload, jwtSecret)
    res.cookie('jwt', token)
    res.json(insertion.rows[0])
  } catch (err) {
    console.log(err.message)
    res.send(`Error: ${err.message}`)
  }
})

router.post('/login', async (req, res) => {
  try {
    const { rows } = await db.query(`
      SELECT * FROM users WHERE email = '${req.body.email}'
    `)

    if (rows.length === 0) {
      throw new Error('User with that email or password does not exist.')
    }

    let user = rows[0]

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    )
    console.log(isPasswordValid)
    res.json(isPasswordValid)
  } catch (err) {
    console.error(err.message)
    res.json({ error: err.message })
  }
})

router.get('/logout', (req, res) => {
  res.clearCookie('jwt')
  res.send('You are logged out')
})

export default router
