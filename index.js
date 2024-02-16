import express from 'express'
const app = express()
const app = express()

import reviewsRoutes from './routes/reviewsRoutes.js'
import bookingsRoutes from './routes/bookingsRoutes.js'

app.use(reviewsRoutes)
app.use(bookingsRoutes)

import usersRoutes from './routes/usersRoutes.js'
app.use(usersRoutes)

app.listen(4100, () => {
  console.log('Airbnb API ready on localhost:4100')
})