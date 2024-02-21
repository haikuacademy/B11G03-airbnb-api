import express from 'express'
const router = express.Router()
import db from '../db.js'

router.post('/photos', async (req, res) => {
  try {
    const insertion = await db.query(`
    INSERT INTO pictures (pic_url, house_id)
    VALUES ('${req.body.pic_url}', ${req.body.house_id})
    RETURNING *`)
    console.log(insertion.rows[0])
    res.json(insertion.rows[0])
  } catch (err) {
    console.log(err.message)
    res.send(`Error: ${err.message}`)
  }
})

router.patch('/photos/:picture_id', async (req, res) => {
  try {
    const { rows } = await db.query(`
      UPDATE pictures
      SET pic_url = '${req.body.pic_url}'
      WHERE picture_id = ${req.params.picture_id}
      RETURNING *
    `)
    console.log(rows[0])
    res.send(rows[0])
  } catch (err) {
    console.log(err.message)
    res.send(`Error: ${err.message}`)
  }
})

router.get('/photos', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM pictures')
    console.log(rows)
    res.json(rows)
  } catch (err) {
    console.error(err.message)
    res.json(err)
  }
})

router.get('/photos/:photoId', async (req, res) => {
  try {
    const { rows } = await db.query(
      `SELECT * FROM pictures WHERE picture_id = ${req.params.photoId}`
    )
    console.log(rows)
    const result = rows[0]
    console.log(result)
    if (!result) {
      res.json({ error: 'photo not found' })
    }
    res.json(result)
  } catch (err) {
    console.error(err.message)
    res.json(err)
  }
})

router.delete('/photos/:picture_id', async (req, res) => {
  try {
    const { rowCount } = await db.query(`
	DELETE FROM photos WHERE picture_id = ${req.params.picture_id}
`)
    if (!rowCount) {
      throw new Error('Photo does not exist. Delete failed.')
    }
    res.json(rowCount)
  } catch (err) {
    console.log(err)
    res.json(err.message)
  }
})

export default router
