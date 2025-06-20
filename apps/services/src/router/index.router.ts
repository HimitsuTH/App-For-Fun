import express from 'express'

import sequelize from 'libs/helpers/sequelize.helper'

const router = express.Router()


router.get('/', async (req, res, next) => {
  res.locals.body = {
    request_uid: res.locals.requestUID,
    service: '',
    version: process.env.VERSION,
    environment: process.env.ENVIRONMENT,
    current_date: new Date(),
    database: sequelize.authenticate().then(() => ('connected')).catch(() => ('disconnected')),
  }
  res.json(res.locals.body)
  next()
})

export default router