import express from 'express'

const app = express()

import photosRoutes from './photos/photosRoutes.js'
import authRoutes from './auth/authRoutes.js'

app.use(photosRoutes)
app.use(authRoutes)

app.listen(4100, () => {
  console.log('Airbnb API ready on localhost:4100')
})
