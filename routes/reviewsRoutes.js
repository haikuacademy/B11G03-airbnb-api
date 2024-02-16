import { Router } from 'express'
const router = Router()
import db from '../db.js'

router.get('/reviews', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM reviews')
    console.log(rows)
    res.json(rows)
  } catch (err) {
    console.error(err.message)
    res.json(err)
  }
})

router.get('/reviews/1', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM reviews WHERE review_id = 1')
    console.log(rows)
    res.json(rows)
  } catch (err) {
    console.error(err.message)
    res.json(err)
  }
})

export default router
