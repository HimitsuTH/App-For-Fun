import passport from "passport";
import logger from "libs/helpers/winston.helper";
import { Op } from "sequelize";
import bcrypt from "bcrypt";

import passportLocal from "passport-local";
import { Role, User } from "libs/models";
import { decryption, encryption } from "libs/helpers/crypto.helper";

const userAttributes = [
  "id",
  "email",
  "username",
  "password",
  "invalid_password_time",
];

const LocalStrategy = passportLocal.Strategy;

passport.use(
  new LocalStrategy({ passReqToCallback: true }, async function (
    req,
    username,
    password,
    done
  ) {
    try {
      const _username = encryption(username)
      let _user: any;
      const user = await User.findOne({
        where: {
          [Op.or]: [{ username: _username }, { email: _username }],
        },
        include: [
          {
            model: Role,
            as: 'roles',
            attributes: [
                'name'
            ]
          }
        ]
      });
      if (!user) throw new Error("Auth failed...");
      
      if (user.status === 'inactive') throw new Error("---------------Please Contact ADMIN For UNLOCK This User---------------");

      if (user.invalid_password_time > 5) {
        await user.update({
          status: "inactive"
        })
        throw new Error("---------------Limit time to login this user more than 5 pls contact ADMIN---------------");
      }

      const matchPassword = await bcrypt.compare(password, user.password);
      if (!matchPassword) {
        user.update({
          invalid_password_time: user.invalid_password_time + 1
        })
        throw new Error("Password weng worng!");
      }

      _user = user.toJSON();

      const userInfo = {
        ..._user,
        email: decryption(_user.email),
        password: undefined,
      };

      await user.update({
          invalid_password_time: null
      })

      done(null, { ...userInfo });
    } catch (err) {
      console.log(err)
      logger.error("login failed...");
      done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  try {
    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.deserializeUser(async (user: any, done) => {
  try {
    if (!user) throw new Error("401 auth failed..");
    let _user: any;

    const checkUser = await User.findOne({
      attributes: userAttributes,
      where: {
        id: user.id,
      },
      include: [
          {
            model: Role,
            as: 'roles',
            attributes: [
                'name'
            ]
          }
      ]
    });
    if (!checkUser) throw new Error("401 auth failed..");
    _user = checkUser.toJSON();

    const userInfo = {
      ..._user,
      email: decryption(_user.email),
      passport: undefined,
    };

    done(null, { ...userInfo, redireact_path: "/" });
  } catch (err) {
    done(err);
  }
});

export default passport;
