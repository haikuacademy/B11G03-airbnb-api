import Router from 'express'
const authRouter = Router()

authRouter.get('/signup', (req, res) => {
  res.send('Hello from signup')
})

authRouter.get('/login', (req, res) => {
  res.send('Hello from login')
})

authRouter.get('/logout', (req, res) => {
  res.send('Hello from logout')
})

export default authRouter
