import { z } from 'zod'
import { genderValues } from '../components/gender'

export const genderSchema = z.literal(genderValues[0]).or(z.literal(genderValues[1])).or(z.literal(genderValues[2]))
