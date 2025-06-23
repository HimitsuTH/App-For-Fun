import express from 'express'

import sequelize from 'libs/helpers/sequelize.helper'
import { ENVIRONMENT } from 'libs/config/config'

const router = express.Router()

router.get('/', async (req, res, next) => {
  res.locals.body = {
    service: 'xxxx',
    environment: ENVIRONMENT,
    current_date: new Date(),
    database: sequelize.authenticate().then(() => ('connected')).catch(() => ('disconnected')),
  }

  res.json(res.locals.body)
  next()
})

export default router