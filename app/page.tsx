import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { getQueryClient, trpc } from '~/trpc/server'
import { DogsPage } from './dogs-page'

export default async function Home() {
	const queryClient = getQueryClient()
	await queryClient.prefetchQuery(trpc.dogs.getRandomDogs.queryOptions(11))

	const dehydratedState = dehydrate(queryClient)

	return (
		<HydrationBoundary state={dehydratedState}>
			<div className="flex min-h-screen items-center justify-center bg-zinc-50 px-8">
				<main className="flex min-h-screen w-full flex-col items-center py-4">
					<DogsPage />
				</main>
			</div>
		</HydrationBoundary>
	)
}
