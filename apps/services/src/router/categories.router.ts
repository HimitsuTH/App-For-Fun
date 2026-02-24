import express from "express";
import categoryController from "libs/controllers/category.controller";
import middlewareHelper from "libs/helpers/middleware.helper";

const router = express.Router();

router.get("/ping", (req, res) => {
  res.json({ test: "pong" });
});

router.get("/", categoryController.getCategory, async (req, res, next) => {
  res.locals.body = {
    res_code: "200",
    res_desc: "success",
    categories: res.locals.categories,
  };
  res.json(res.locals.body);
  next();
});
router.post(
  "/",
  middlewareHelper.checkRole,
  categoryController.addCategories,
  async (req, res, next) => {
    res.locals.body = {
      res_code: "201",
      res_desc: "success",
    };
    res.json(res.locals.body);
    next();
  }
);

router.post(
  "/delete",
  middlewareHelper.checkRole,
  categoryController.deleteCategorise,
  async (req, res, next) => {
    res.locals.body = {
      res_code: "202",
      res_desc: "success",
    };
    res.json(res.locals.body);
    next();
  }
);
export default router;
