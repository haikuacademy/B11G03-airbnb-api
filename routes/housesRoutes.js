import { Router } from 'express'
const router = Router()

// Define a GET route for fetching the list of users
router.get('/houses', (req, res) => {
  res.json([
    { id: 1, location: 'Koh Phangan' },
    { id: 2, location: 'Bali' }
  ])
})

// Define a GET route for fetching a single user
router.get('/houses/1', (req, res) => {
  res.json({ id: 1, location: 'Koh Phangan' })
})

// Export the router
export default router
