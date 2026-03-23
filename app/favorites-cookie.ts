import z from 'zod'
import { type Dog, dogSchema } from './dog'

export const FAVORITES_COOKIE_NAME = 'dog-favorites'

export const FAVORITES_COOKIE_MAX_AGE = 60 * 60 * 24 * 365

const favoritesArraySchema = z.array(dogSchema)

export function parseFavoritesCookie(value: string | undefined): Dog[] {
	if (!value) return []
	try {
		const decoded = decodeURIComponent(value)
		const parsed = JSON.parse(decoded) as unknown
		const result = favoritesArraySchema.safeParse(parsed)
		return result.success ? result.data : []
	} catch {
		return []
	}
}
