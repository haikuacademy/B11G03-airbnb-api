import express from 'express'
import cookieParser from 'cookie-parser'

const app = express()

app.use(express.json())
app.use(cookieParser())

import reviewsRoutes from './routes/reviewsRoutes.js'
import bookingsRoutes from './routes/bookingsRoutes.js'
import usersRoutes from './routes/usersRoutes.js'
import photosRoutes from './routes/photosRoutes.js'
import authRoutes from './routes/authRoutes.js'
import housesRoutes from './routes/housesRoutes.js'

app.use(reviewsRoutes)
app.use(bookingsRoutes)
app.use(usersRoutes)
app.use(photosRoutes)
app.use(authRoutes)
app.use(housesRoutes)

app.listen(4100, () => {
  console.log('Airbnb API ready on localhost:4100')
})
