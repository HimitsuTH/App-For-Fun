import express from 'express'
import authController from 'libs/controllers/auth.controller'
import passportHelper from '../helpers/passport.helper'
import middleware from 'libs/helpers/middleware.helper'

const router = express.Router()

router.get('/', (req,res)=> {
    res.send('test......')
})

router.post('/login',
  middleware.checkLoginSession,
  passportHelper.authenticate('local', {
    failWithError: true
  }), 
  async (req, res, next) => {
    res.json({
      res_code: '200',
      res_desc: 'success'
    })
  }
)
router.get('/register', authController.localRegister)


export default router