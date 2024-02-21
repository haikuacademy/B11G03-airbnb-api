import { Router } from 'express'
const router = Router()

import db from '../db.js'

router.post('/reviews', async (req, res) => {
  try {
    const reviewer_id = req.body.reviewer_id
    const house_id = req.body.house_id
    const review_text = req.body.review_text
    const star_rating = req.body.star_rating
    const review_date = req.body.review_date
    const { rows } = await db.query(`
  INSERT INTO reviews (reviewer_id, house_id, review_text, star_rating, review_date)
  VALUES (${reviewer_id}, ${house_id}, '${review_text}', ${star_rating}, '${review_date}')
  RETURNING *
  `)
    res.json({ result: rows[0] })
  } catch (err) {
    console.error(err.message)
    res.json({ error: err.message })
  }
})

router.get('/reviews', async (req, res) => {
  try {
    if (req.query.house) {
      const houseCheck = await db.query(
        `SELECT 1 FROM houses WHERE house_id = ${req.query.house}`
      )
      if (houseCheck.rows.length === 0) {
        throw new Error('House does not exist.')
      }
    }
    let house = ''
    if (req.query.house) {
      house = `WHERE house_id = ${req.query.house}`
    }
    const { rows } = await db.query(
      `SELECT * FROM reviews ${house} ORDER BY review_date DESC`
    )
    if (rows.length === 0) {
      throw new Error('Reviews for this house do not exist.')
    }
    console.log(rows)
    res.json(rows)
  } catch (err) {
    console.error(err.message)
    res.json({ error: err.message })
  }
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
