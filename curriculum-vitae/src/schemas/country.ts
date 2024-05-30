import { z } from 'zod'
import { countries } from '../data/countries'

const validIds = new Set(countries.map(x => x.id))

export const countrySchema = z.number({ message: 'Select country' }).refine(id => validIds.has(id), { message: 'Select a valid country' })
