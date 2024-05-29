import { z } from 'zod'

export const dateSchema = z.object({
  year: z.number(),
  month: z.number()
})
