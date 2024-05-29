import { z } from 'zod'
import { countrySchema } from './schemas/country'
import { genderSchema } from './schemas/gender'
import { dateSchema } from './schemas/date'
import { itemWithLevelSchema } from './schemas/item-with-level'

const LOCALSTORAGE_KEY = 'ui-ux-cv-data'

const storageSchema = z.object({
  personal: z.object({
    fullName: z.string(),
    email: z.string().email(),
    gender: genderSchema,
    nationality: countrySchema,
    about: z.string()
  }),
  languages: z.array(itemWithLevelSchema),
  skills: z.array(itemWithLevelSchema),
  links: z.array(z.string()),
  workHistory: z.array(z.object({
    companyName: z.string(),
    role: z.string(),
    description: z.string(),
    id: z.string(),
    startDate: dateSchema,
    endDate: dateSchema.optional()
  }))
})

export const tryLoad = (): z.infer<typeof storageSchema> | null => {
  try {
    const data = localStorage.getItem('ui-ux-cv-data')

    if (data === null) {
      console.log('No data in localStorage')
      return null
    }

    const res = storageSchema.safeParse(JSON.parse(data))
    if (res.success) {
      return res.data
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

export const trySave = (data: unknown): boolean => {
  const res = storageSchema.safeParse(data)
  if (res.success) {
    // TODO: This (i.e. workhistory, etc) isn't really related to the same submit button, since the
    //       submit button will only validate data from the "personal" section.
    //       I haven't really thought about the design of this yet though.
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(res.data))
    return true
  } else {
    console.error("Couldn't save data")
    console.error(res)
    return false
  }
}
