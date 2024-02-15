import express from 'express'
import bookingsRoutes from './routes/bookingsRoutes.js'

const app = express()
app.use(bookingsRoutes)

app.listen(4100, () => {
  console.log('Airbnb API ready on localhost:4100')
})
