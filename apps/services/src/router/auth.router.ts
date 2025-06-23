import express from "express";
import authController from "libs/controllers/auth.controller";
import passportHelper from "../helpers/passport.helper";
import middleware from "libs/helpers/middleware.helper";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("test......");
});

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
  }
);

router.post("/logout", async (req, res, next) => {
  const session: any = req.session;
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
      next(new Error("loout fail...."));
    }
  });
});

router.get("/register", authController.localRegister);

export default router;
