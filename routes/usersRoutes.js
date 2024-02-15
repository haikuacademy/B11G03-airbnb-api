import { Router } from 'express'
const router = Router()

// Define a GET route for fetching the list of users
router.get('/users', (req, res) => {
  res.json([
    { id: 1, firstName: 'Alice' },
    { id: 2, firstName: 'Bob' }
  ])
})

// Define a GET route for fetching a single user
router.get('/users/1', (req, res) => {
  res.json({ id: 1, firstName: 'Alice' })
})

// Export the router
export default router
