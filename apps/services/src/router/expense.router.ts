import express from "express";
import expensesController from "libs/controllers/expense.controller";

const router = express.Router();

router.get("/", expensesController.getExpense, async (req, res, next) => {
  res.json({ res_code: "200", res_desc: "success", expenses: res.locals.expenses });
  next();
});

router.post("/", expensesController.addExpense, async (req, res, next) => {
  res.json({ res_code: "201", res_desc: "success" });
  next();
});

// ✅ แก้ไข expense
router.put("/:id", expensesController.updateExpense, async (req, res, next) => {
  res.json({ res_code: "200", res_desc: "updated" });
  next();
});

// ✅ ลบ expense
router.delete("/:id", expensesController.deleteExpense, async (req, res, next) => {
  res.json({ res_code: "200", res_desc: "deleted" });
  next();
});

export default router;
