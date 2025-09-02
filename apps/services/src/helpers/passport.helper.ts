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
      console.log('test----local ----->')

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
    console.log('------serializeUser------>')
    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.deserializeUser(async (user: any, done) => { // Corrected: 'id' is the parameter
  console.log('*** PASSPORT: deserializeUser called ***');
  console.log('ID received for deserialization:-------->', user); // Log the ID being processed

  try {
    if (!user) { // Check if the ID itself is valid
      console.log('ERROR: deserializeUser received empty or invalid ID:', user);
      return done(new Error("Invalid user ID for deserialization"));
    }

    const checkUser = await User.findOne({
      attributes: userAttributes,
      where: {
        id: user.id, // Corrected: Use 'id' directly
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

    if (!checkUser) {
      console.log('Deserialized user NOT found in DB for ID:', user);
      return done(null, false); // Indicate user not found, Passport will set req.user to undefined
    }

    let _user = checkUser.toJSON();

    // Decrypt email and prepare user info
    const userInfo = {
      ..._user,
      email: decryption(_user.email),
      // Do NOT add 'passport: undefined' or 'redireact_path' here.
      // req.user should be a clean user object.
    };

    console.log('Deserialized user found and prepared:', userInfo.username); // Log the found user
    console.log('------deserializeUser finished------');
    done(null, userInfo); // Pass the clean user object
  } catch (err) {
    console.error('ERROR in deserializeUser:', err); // Log the actual error
    done(err); // Pass the error to Passport
  }
});

// passport.deserializeUser(async (user: any, done) => {
//   try {
//     if (!user) throw new Error("401 auth failed..");
//     let _user: any;

//     const checkUser = await User.findOne({
//       attributes: userAttributes,
//       where: {
//         id: user.id,
//       },
//       include: [
//           {
//             model: Role,
//             as: 'roles',
//             attributes: [
//                 'name'
//             ]
//           }
//       ]
//     });
//     if (!checkUser) throw new Error("401 auth failed..");
//     _user = checkUser.toJSON();

//     console.log(_user)

//     const userInfo = {
//       ..._user,
//       email: decryption(_user.email),
//       passport: undefined,
//     };
//     console.log('------deserializeUser------>')
//     done(null, { ...userInfo, redireact_path: "/" });
//   } catch (err) {
//     done(err);
//   }
// });

export default passport;
