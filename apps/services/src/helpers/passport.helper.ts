import passport from "passport";
import logger from "libs/helpers/winston.helper";
// import bcrypt from "bcrypt"

import passportLocal from "passport-local"
import { Users } from 'libs/models'


const LocalStrategy = passportLocal.Strategy

passport.use(new LocalStrategy({passReqToCallback: true},
   async function(req, username, password, done) {
    try{
      const user = await Users.findOne({where: {
        email: 1
      }})

      console.log('test----------------------1---------->')

        console.log('test-----------------------2--------->')
        console.log(user)
      const userInfo ={
        ...user
      }
      done(null, {userInfo})
    }catch (err) {
      logger.error('login failed...')
      logger.error(err)
      done(err)
    }
  } 
));



export default passport