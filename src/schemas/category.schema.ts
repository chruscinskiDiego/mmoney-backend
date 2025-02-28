import { z } from 'zod';

export const categorySchema = z.object({
    name: z.string(),
    user: z.string(),
})