import { z } from "zod";

export const expenseSchema = z.object({
  name: z.string().nonempty('Request field Name.'),
  amount: z.string().nonempty('Request field Amount.'),
  category: z.object({
    id: z.number(),
    label: z.string(),
    value: z.string(),
  }).optional()
  .refine(data => !!data?.value, {
    message: 'Please select a Categories.',
  }),
  type: z.object({
    label: z.string(),
    value: z.string(),
  }).optional()
  .refine(data => !!data?.value, {
    message: 'Please select a Types.',
  }),
  description: z.string(),
  date: z.string().nonempty('Request field Date.'),
});

export const categorySchema = z.object({
  name: z.string().nonempty('Request field Name.'),
  description: z.string(),
});

export type TExpenseSchema = z.infer<typeof expenseSchema>;
export type TCategorySchema = z.infer<typeof categorySchema>;