import passport from "passport";
import logger from "libs/helpers/winston.helper";
import { Op } from "sequelize";
import bcrypt from "bcrypt";

import passportLocal from "passport-local";
import { Role, User } from "libs/models";
import { decryption, encryption } from "libs/helpers/crypto.helper";
import { ResponseError } from "libs/types/auth.type";

const userAttributes = [
  "id",
  "email",
  "username",
  "password",
  "invalid_password_time",
  "status",
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
      const _username = encryption(username);
      let _user: any;
      const user = await User.findOne({
        where: {
          [Op.or]: [{ username: _username }, { email: _username }],
        },
        include: [
          {
            model: Role,
            as: "roles",
            attributes: ["name"],
          },
        ],
      });

      if (!user) {
        const error: ResponseError = new Error("Auth failed...");
        throw error
      }

      if (user.status === "inactive")
        throw new Error(
          "---------------Please Contact ADMIN For UNLOCK This User---------------"
        );

      if (user.invalid_password_time > 5) {
        await user.update({
          status: "inactive",
        });
        throw new Error(
          "---------------Limit time to login this user more than 5 pls contact ADMIN---------------"
        );
      }

      const matchPassword = await bcrypt.compare(password, user.password);
      if (!matchPassword) {
        user.update({
          invalid_password_time: user.invalid_password_time + 1,
        });
        const error: ResponseError = new Error("Password weng worng!");
        error.statusCode = 401;
        throw error
      }

      _user = user.toJSON();

      const userInfo: User = {
        ..._user,
        email: decryption(_user.email),
        password: undefined,
      };

      await user.update({
        invalid_password_time: null,
      });
      console.log("test----local ----->");

      done(null, { ...userInfo });
    } catch (err) {
      console.log(err);
      logger.error("login failed...");
      done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  try {
    console.log("------serializeUser------>");
    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.deserializeUser(async (user: any, done) => {
  console.log("*** PASSPORT: deserializeUser called ***");
  console.log("ID received for deserialization:-------->", user);

  try {
    if (!user) {
      console.log("ERROR: deserializeUser received empty or invalid ID:", user);
      return done(new Error("Invalid user ID for deserialization"));
    }

    const checkUser = await User.findOne({
      attributes: userAttributes,
      where: {
        id: user.id,
      },
      include: [
        {
          model: Role,
          as: "roles",
          attributes: ["name"],
        },
      ],
    });

    if (!checkUser) {
      console.log("Deserialized user NOT found in DB for ID:", user);
      return done(null, false); // Indicate user not found, Passport will set req.user to undefined
    }

    let _user = checkUser.toJSON();

    const userInfo = {
      ..._user,
      email: decryption(_user.email),
      username: decryption(_user.username),
      password: undefined,
    };

    console.log("Deserialized user found and prepared:", userInfo.username);
    console.log("------deserializeUser finished------");
    done(null, userInfo); // Pass the clean user object
  } catch (err) {
    console.error("ERROR in deserializeUser:", err); // Log the actual error
    done(err); // Pass the error to Passport
  }
});

export default passport;
