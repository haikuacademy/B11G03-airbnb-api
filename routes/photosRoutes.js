import express from 'express'
const router = express.Router()
import db from '../db.js'

router.get('/photos', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM pictures') // Note DB table is called pictures not photos
    console.log(rows)
    res.json(rows)
  } catch (err) {
    console.error(err.message)
    res.json(err)
  }
})

router.get('/photos', async (req, res) => {
  let houseId = req.query.house
  try {
    const housePhotos = photos.filter((photo) => photo.house_id === houseId)
    console.log(housePhotos)
    res.json(housePhotos)
    if (result === undefined) {
      res.json({ error: 'house parameter is required' })
    }
    res.json(result)
  } catch (err) {
    console.error(err.message)
    res.json(err)
  }
})

export default router
