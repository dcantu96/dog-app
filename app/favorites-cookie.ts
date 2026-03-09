import type { Dog } from './dog-viewer-context'

export const FAVORITES_COOKIE_NAME = 'dog-favorites'

export const FAVORITES_COOKIE_MAX_AGE = 60 * 60 * 24 * 365

function isDogShape(item: unknown): item is Dog {
	return (
		typeof item === 'object' &&
		item !== null &&
		'image' in item &&
		'breed' in item &&
		typeof (item as Dog).image === 'string' &&
		typeof (item as Dog).breed === 'string'
	)
}

export function parseFavoritesCookie(value: string | undefined): Dog[] {
	if (!value) return []
	try {
		const decoded = decodeURIComponent(value)
		const parsed = JSON.parse(decoded) as unknown
		if (!Array.isArray(parsed)) return []
		return parsed.filter(isDogShape)
	} catch {
		return []
	}
}

export function validateFavoritesPayload(payload: unknown): Dog[] {
	if (!Array.isArray(payload)) return []
	return payload.filter(isDogShape)
}
