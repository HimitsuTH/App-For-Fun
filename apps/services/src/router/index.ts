import express from "express";
import indexRouter from "./index.router";
import authRouter from "./auth.router";
import expenseRouter from './expense.router'
import categoryRouter from './category.router'
import middlewareHelper from "libs/helpers/middleware.helper";

const router = express.Router();

router.use("/", indexRouter);
router.use("/api/v1/auth", authRouter);
router.use("/api/v1/expense",middlewareHelper.checkActiveSession, expenseRouter);
router.use("/api/v1/expense",middlewareHelper.checkActiveSession, categoryRouter);

router.get("/ping", (req, res) => {
  res.json({ test: "pong" });
});

export default router;
