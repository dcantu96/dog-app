import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { cookies } from 'next/headers'
import { getQueryClient, trpc } from '~/trpc/server'
import { DogsPage } from './dogs-page'
import { FAVORITES_COOKIE_NAME, parseFavoritesCookie } from './favorites-cookie'

export default async function Home() {
	const queryClient = getQueryClient()
	await queryClient.prefetchQuery(trpc.dogs.getRandomDogs.queryOptions(11))

	const cookieStore = await cookies()
	const initialFavorites = parseFavoritesCookie(
		cookieStore.get(FAVORITES_COOKIE_NAME)?.value,
	)

	const dehydratedState = dehydrate(queryClient)

	return (
		<HydrationBoundary state={dehydratedState}>
			<div className="flex min-h-screen items-center justify-center bg-zinc-50 px-8">
				<main className="flex min-h-screen w-full flex-col items-center py-4">
					<DogsPage initialFavorites={initialFavorites} />
				</main>
			</div>
		</HydrationBoundary>
	)
}
