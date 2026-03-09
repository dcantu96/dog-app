import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import {
	FAVORITES_COOKIE_MAX_AGE,
	FAVORITES_COOKIE_NAME,
	validateFavoritesPayload,
} from '../../favorites-cookie'

export async function POST(request: Request) {
	const payload = await request.json().catch(() => null)
	const favorites = validateFavoritesPayload(payload?.favorites)

	const cookieStore = await cookies()
	if (favorites.length === 0) {
		cookieStore.delete(FAVORITES_COOKIE_NAME)
	} else {
		const value = encodeURIComponent(JSON.stringify(favorites))
		cookieStore.set(FAVORITES_COOKIE_NAME, value, {
			path: '/',
			maxAge: FAVORITES_COOKIE_MAX_AGE,
			sameSite: 'lax',
		})
	}
	return NextResponse.json({ ok: true })
}
