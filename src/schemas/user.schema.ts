import { z } from "zod";

export const userSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    password: z.string(),
    isActive: z.boolean(),
})