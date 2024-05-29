import { z } from 'zod'
import { countrySchema } from './schemas/country'
import { genderSchema } from './schemas/gender'
import { dateSchema } from './schemas/date'
import { itemWithLevelSchema } from './schemas/item-with-level'
import { pick } from 'lodash'

const LOCALSTORAGE_KEY = 'ui-ux-cv-data'

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

function pickOrNull<T = Record<string, unknown>> (obj: T, keys: Array<keyof T>): Partial<T> | null {
  if (keys == null || keys.length === 0) return obj

  const filtered = pick(obj, keys)
  if (Object.keys(filtered).length > 0) {
    return filtered
  }

  return null
}

interface LoadArgs {
  select?: Array<keyof StoragePartial>
}

export function load ({ select = [] }: LoadArgs = {}): StoragePartial | null {
  try {
    const data = localStorage.getItem(LOCALSTORAGE_KEY)

    if (data === null) {
      console.log('No data in localStorage')
      return null
    }

    const res = storagePartialSchema.safeParse(JSON.parse(data))
    if (res.success) {
      return pickOrNull(res.data, select)
    } else {
      console.error("Couldn't load data from storage")
      console.error(res)
      console.error(res.error.message)
    }
  } catch (e: unknown) {
    console.error(e)
  }

  return null
}

export const save = (data: unknown): boolean => {
  const res = storagePartialSchema.safeParse(data)
  const current = load() ?? {}

  if (res.success && current !== null) {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify({ ...current, ...res.data }))
    return true
  } else {
    console.error("Couldn't save data")
    console.error(res)
    return false
  }
}
