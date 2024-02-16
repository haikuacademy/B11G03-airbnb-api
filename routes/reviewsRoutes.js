import { Router } from 'express'
const router = Router()

router.get('/reviews', (req, res) => {
  res.json([
    { id: 1, rating: 3 },
    { id: 2, rating: 4 },
    { id: 3, rating: 5 }
  ])
})

router.get('/reviews/1', (req, res) => {
  res.send({ id: 1, rating: 3 })
})

export default router
