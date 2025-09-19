import { z } from "zod";

export const expenseSchema = z.object({
  name: z.string(),
  amount: z.string(),
  type: z.string(),
  description: z.string(),
  date: z.string(),
});

export type TExpenseSchema= z.infer<typeof expenseSchema>;