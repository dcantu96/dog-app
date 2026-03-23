import { cookies } from 'next/headers'
import z from 'zod'
import {
	FAVORITES_COOKIE_MAX_AGE,
	FAVORITES_COOKIE_NAME,
} from '~/app/favorites-cookie'
import { baseProcedure, createTRPCRouter } from '../init'

const dogSchema = z.object({
	image: z.string(),
	breed: z.string(),
})

export const favoritesRouter = createTRPCRouter({
	set: baseProcedure
		.input(z.object({ favorites: z.array(dogSchema) }))
		.mutation(async ({ input }) => {
			const cookieStore = await cookies()
			if (input.favorites.length === 0) {
				cookieStore.delete(FAVORITES_COOKIE_NAME)
			} else {
				const value = encodeURIComponent(JSON.stringify(input.favorites))
				cookieStore.set(FAVORITES_COOKIE_NAME, value, {
					path: '/',
					maxAge: FAVORITES_COOKIE_MAX_AGE,
					sameSite: 'lax',
				})
			}
			return { ok: true as const }
		}),
})
