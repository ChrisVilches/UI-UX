import { z } from 'zod'
import { countrySchema } from './schemas/country'
import { genderSchema } from './schemas/gender'
import { dateSchema } from './schemas/date'
import { itemWithLevelSchema } from './schemas/item-with-level'
import { openDB } from 'idb'
import { sleep } from './util'

const db = openDB('db', 1, {
  upgrade (db) {
    db.createObjectStore('cvs')
  }
})

const storageSchema = z.object({
  fullName: z.string(),
  email: z.string().email(),
  gender: genderSchema,
  nationality: countrySchema,
  languages: z.array(itemWithLevelSchema),
  skills: z.array(itemWithLevelSchema),
  links: z.array(z.string()),
  about: z.string(),
  workHistory: z.array(z.object({
    companyName: z.string(),
    role: z.string(),
    description: z.string(),
    id: z.string(),
    startDate: dateSchema,
    endDate: dateSchema.optional()
  }))
})

const storagePartialSchema = storageSchema.partial()
type StoragePartial = z.infer<typeof storagePartialSchema>

export async function load (): Promise<StoragePartial | null> {
  const data = await (await db).get('cvs', 'main-user')
  const res = storagePartialSchema.safeParse(data)
  if (res.success) {
    return res.data
  } else {
    console.error("Couldn't parse data")
    console.error(res)
  }

  return null
}

export const save = async (data: unknown): Promise<void> => {
  const res = storagePartialSchema.safeParse(data)

  if (res.success) {
    await sleep(1000)
    const current = (await load()) ?? {}
    await (await db).put('cvs', { ...current, ...res.data }, 'main-user')
  } else {
    console.error("Couldn't parse data")
    console.error(res)
  }
}
