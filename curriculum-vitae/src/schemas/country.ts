import { z } from 'zod'

// TODO: Validate it's contained in the countries list.
export const countrySchema = z.number({ message: 'Select country' }).nonnegative()
