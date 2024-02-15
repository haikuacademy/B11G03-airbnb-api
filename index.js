import express from 'express'

const app = express()

import photosRouter from './photos/photosRoutes.js'
import authRouter from './auth/authRoutes.js'

app.use(photosRouter)
app.use(authRouter)

app.listen(4100, () => {
  console.log('Airbnb API ready on localhost:4100')
})
