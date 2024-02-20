import express from 'express'
const router = express.Router()

import db from '../db.js'

router.get('/signup', (req, res) => {
  res.send('Hello from signup')
})

router.post('/login', async (req, res) => {
  const email = req.body.email
  const password = req.body.password
  try {
    const { rows } = await db.query(`
      SELECT * FROM users WHERE email = '${email}' AND password = '${password}'
    `)
    if (rows.length === 0) {
      throw new Error('User with that email or password does not exist.')
    }
    res.json({ rows })
  } catch (err) {
    console.error(err.message)
    res.json({ error: err.message })
  }
})

router.get('/logout', (req, res) => {
  res.send('Hello from logout')
})

export default router
