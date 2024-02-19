import { Router } from 'express'
const router = Router()

import db from '../db.js'

router.get('/reviews', (req, res) => {
  res.json([
    { id: 1, rating: 3 },
    { id: 2, rating: 4 },
    { id: 3, rating: 5 }
  ])
})

router.get('/reviews/:reviewID', async (req, res) => {
  try {
    const { rows } = await db.query(
      `SELECT * FROM reviews WHERE review_id = ${req.params.reviewID}`
    )
    const returnObject =
      rows.length > 0 ? rows[0] : { error: 'review not found' }
    res.json(returnObject)
  } catch (err) {
    console.error(err.message)
    res.json(err)
  }
})

export default router
