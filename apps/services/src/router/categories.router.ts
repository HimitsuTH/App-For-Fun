import express from "express";
import categoryController from "libs/controllers/category.controller";
import middlewareHelper from "libs/helpers/middleware.helper";

const router = express.Router();

router.get("/", categoryController.getCategory, async (req, res, next) => {
  res.json({ res_code: "200", res_desc: "success", categories: res.locals.categories });
  next();
});

router.post("/", middlewareHelper.checkRole, categoryController.addCategories, async (req, res, next) => {
  res.json({ res_code: "201", res_desc: "success" });
  next();
});

router.post("/delete", middlewareHelper.checkRole, categoryController.deleteCategorise, async (req, res, next) => {
  res.json({ res_code: "202", res_desc: "success" });
  next();
});

// ✅ ดึง budget summary (ยอดใช้จริง vs budget)
router.get("/budget", categoryController.getBudgetSummary, async (req, res, next) => {
  res.json({ res_code: "200", res_desc: "success", budgets: res.locals.budgets });
  next();
});

// ✅ ตั้ง/แก้ budget limit ต่อหมวดหมู่
router.put("/:id/budget", categoryController.updateBudgetLimit, async (req, res, next) => {
  res.json({ res_code: "200", res_desc: "success" });
  next();
});

export default router;
