import express from 'express'
import reviewsRoutes from './routes/reviewsRoutes.js'

const app = express()
app.use(reviewsRoutes)

app.listen(4100, () => {
  console.log('Airbnb API ready on localhost:4100')
})
