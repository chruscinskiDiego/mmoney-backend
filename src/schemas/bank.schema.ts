import { z } from 'zod';

export const bankSchema = z.object({
    name: z.string(),
    code: z.string(),
    user: z.string()
})