import passport from "passport";
import logger from "libs/helpers/winston.helper";
import { Op } from "sequelize";
import bcrypt from "bcrypt";

import passportLocal from "passport-local";
import { Roles, Users } from "libs/models";

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
      let _user: any;
      const user = await Users.findOne({
        where: {
          [Op.or]: [{ username: username }, { email: username }],
        },
        include: [
            {
                model: Roles,
                as: 'roles',
                attributes: [
                    'name'
                ]
            }
        ]
      });
      if (!user) throw new Error("Auth failed...");
      const matchPassword = await bcrypt.compare(password, user.password);
      if (!matchPassword) throw new Error("Password weng worng!");
      _user = user.toJSON();
      const userInfo = {
        ..._user,
        password: undefined,
      };

      done(null, { ...userInfo });
    } catch (err) {
      logger.error("login failed...");
      logger.error(err);
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

    const checkUser = await Users.findOne({
      attributes: userAttributes,
      where: {
        id: user.id,
      },
      include: [
            {
                model: Roles,
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
      passport: undefined,
    };

    done(null, { ...userInfo, redireact_path: "/" });
  } catch (err) {
    done(err);
  }
});

export default passport;
