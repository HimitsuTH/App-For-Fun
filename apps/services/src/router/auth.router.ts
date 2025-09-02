import express from "express";
import authController from "libs/controllers/auth.controller";
import passportHelper from "../helpers/passport.helper";
import middleware from "libs/helpers/middleware.helper";

const router = express.Router();

console.log('test0-----login--->')

router.post("/login",
  middleware.checkLoginSession,
  passportHelper.authenticate("local", {
    failWithError: true,
  }),
  middleware.setActiveSession,
  async (req, res, next) => {
    res.json({
      res_code: "200",
      res_desc: "success",
      ...req.user,
    });
    next()
  }
);

router.post("/logout", async (req, res, next) => {
  const session: any = req.session;
  console.log('logout----------->',req.session)
  const userId = session.passport.user.id;
  req.logOut((err) => {
    if (!err) {
      res.locals.body = {
        res_code: "200",
        res_desc: "success",
      };
      res.locals.user = {
        id: userId,
      };
      res.json(res.locals.body);
      next(err);
    } else {
      next(new Error("logout fail...."));
    }
  });
});

router.post("/register", 
    authController.localRegister, 
    async (req, res, next) => {
        res.json({
            res_code: "201",
            res_desc: "Register Success",
        });
        next()
    }
);

export default router;
