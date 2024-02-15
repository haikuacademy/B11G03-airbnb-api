import { Router } from 'express'
const router = Router()

// Define a GET route for fetching the list of users
router.get('/houses', (req, res) => {
  res.send('List of houses')
})

// Define a GET route for fetching a single user
router.get('/houses/1', (req, res) => {
  res.send('User number 1')
})

// Export the router
export default router
