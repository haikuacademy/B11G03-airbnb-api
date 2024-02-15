import express from 'express'
const router = express.Router()

router.get('/photos', (req, res) => {
  res.send([
    { id: 1, photourl: 'http://fakephoto.url/1' },
    { id: 2, photourl: 'http://fakephoto.url/2' }
  ])
})

router.get('/photos/1', (req, res) => {
  res.send({ id: 1, photourl: 'http://fakephoto.url/1' })
})

export default router
