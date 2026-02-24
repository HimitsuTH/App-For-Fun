import express from "express";
import walletController from 'libs/controllers/wallet.controller'

const router = express.Router()

router.post("/", walletController.getWallet, async (req, res, next) => {
  res.locals.body = {
    res_code: "200",
    res_desc: "success",
    wallet: res.locals.wallet,
  };
  res.json(res.locals.body);
  next();
});


export default router;