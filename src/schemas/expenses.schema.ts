import { z } from "zod";

export const expensesSchema = z.object({
    value: z.number(),
    obs: z.string(),
    date: z.preprocess((arg) => {
        if (typeof arg === "string" || arg instanceof Date) {
            return new Date(arg);
        }
        return arg;
    }, z.date()),
    userId: z.string(),
    categoryId: z.string(),
    bankAccountId: z.string(),
})