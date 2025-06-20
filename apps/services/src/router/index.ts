import express from 'express'
import indexRouter from './index.router'

const router = express.Router()

router.use('/', indexRouter)

export default router