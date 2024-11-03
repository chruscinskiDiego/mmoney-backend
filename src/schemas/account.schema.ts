import { z } from 'zod';

export const bankAccountSchema = z.object({
    number: z.string(),
    type: z.string(),
    userId: z.string(),
    bankId: z.string()
})