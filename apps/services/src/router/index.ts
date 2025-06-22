import express from 'express'
import indexRouter from './index.router'
import authRouter from './auth.router'

const router = express.Router()

router.use('/', indexRouter)
router.use('/api/v1/auth', authRouter)


router.get('/ping', (req, res) => {
  res.json({test:'pong'})
})


export default router