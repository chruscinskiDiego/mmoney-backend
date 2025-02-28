import { z } from "zod";

export const expensesSchema = z.object({
    value: z.number(),
    situation: z.string(),
    obs: z.string().optional(),
    date: z.preprocess((arg) => {
        if (typeof arg === "string" || arg instanceof Date) {
            return new Date(arg);
        }
        return arg;
    }, z.date()),
    userEmail: z.string(),
    categoryId: z.string(),
    bankAccountId: z.string(),
})