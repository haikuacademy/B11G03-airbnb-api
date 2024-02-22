import db from '../db.js'
import express from 'express'
import bcrypt from 'bcrypt'
const router = express.Router()

router.post('/signup', async (req, res) => {
  try {
    const insertion = await db.query(`
    INSERT INTO users (first_name, last_name, email, password, profile_pic_url)
    VALUES ('${req.body.first_name}', '${req.body.last_name}', '${req.body.email}', '${req.body.password}', '${req.body.profile_pic_url}')
    RETURNING *`)
    console.log(insertion.rows[0])
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
  res.send('Hello from logout')
})

export default router
