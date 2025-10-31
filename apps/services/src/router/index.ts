import express from "express";
import indexRouter from "./index.router";
import authRouter from "./auth.router";
import expenseRouter from './expense.router'
import categoryRouter from './categories.router'
import walletRouter from './wallet.router'
import middlewareHelper from "libs/helpers/middleware.helper";
import profileRouter from './profile.router'

const router = express.Router();

router.use("/", indexRouter);
router.use("/auth", authRouter);
router.use("/expense",middlewareHelper.userAuth(), middlewareHelper.checkActiveSession, expenseRouter);
router.use("/categories",middlewareHelper.userAuth(), middlewareHelper.checkActiveSession, categoryRouter);
router.use("/profile",middlewareHelper.userAuth(), middlewareHelper.checkActiveSession, profileRouter);
router.use("/wallet",middlewareHelper.userAuth(), middlewareHelper.checkActiveSession, walletRouter);

router.get("/ping", (req, res) => {
  res.json({ test: "pong" });
});

export default router;
