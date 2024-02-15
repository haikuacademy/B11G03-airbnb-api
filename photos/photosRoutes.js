import { Router } from 'express'
const photosRouter = Router()

photosRouter.get('/photos', (req, res) => {
  res.send([
    { id: 1, photourl: 'http://fakephoto.url/1' },
    { id: 2, photourl: 'http://fakephoto.url/2' }
  ])
})

photosRouter.get('/photos/1', (req, res) => {
  res.send({ id: 1, photourl: 'http://fakephoto.url/1' })
})

export default photosRouter
