import { z } from 'zod'

export const itemWithLevelSchema = z.object({
  id: z.string(),
  name: z.string(),
  level: z.number()
})
