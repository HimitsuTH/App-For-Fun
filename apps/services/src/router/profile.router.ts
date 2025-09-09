import express from "express";
import { User } from "libs/models";

const router = express.Router();

router.get("/ping", (req, res) => {
  res.json({ test: "pong" });
});

router.get("/", async (req, res, next) => {
  const user = req.user as User;
  res.locals.body = {
    res_code: "200",
    res_desc: "success",
    ...user,
  };
  res.json(res.locals.body);
  next();
});

export default router;
