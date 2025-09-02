import express from "express";
import indexRouter from "./index.router";
import authRouter from "./auth.router";
import expenseRouter from './expense.router'
import categoryRouter from './categories.router'
import middlewareHelper from "libs/helpers/middleware.helper";
import profileRouter from './profile.router'

const router = express.Router();

router.use("/", indexRouter);
router.use("/auth", authRouter);
router.use("/expense",middlewareHelper.checkActiveSession, expenseRouter);
router.use("/categories",middlewareHelper.checkActiveSession, categoryRouter);
router.use("/profile",middlewareHelper.userAuth() , middlewareHelper.checkActiveSession, profileRouter);

router.get("/ping", (req, res) => {
  res.json({ test: "pong" });
});

export default router;
