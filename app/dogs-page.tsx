'use client'

import { useQuery } from '@tanstack/react-query'
import { useTRPC } from '~/trpc/client'
import type { Dog } from './dog-viewer-context'
import { DogViewerProvider } from './dog-viewer-context'
import { DogsContent } from './dogs-content'
import { FavoritesProvider } from './favorites-context'

export function DogsPage({
	initialFavorites = [],
}: {
	initialFavorites?: Dog[]
}) {
	const trpc = useTRPC()
	const {
		data: dogs,
		isLoading,
		error,
	} = useQuery(trpc.dogs.getRandomDogs.queryOptions(11))

	if (isLoading) return <p>Loading dogs…</p>
	if (error) return <p>Error: {error.message}</p>
	if (!dogs?.length) return <p>No dogs.</p>

	return (
		<DogViewerProvider dogs={dogs}>
			<FavoritesProvider initialFavorites={initialFavorites}>
				<DogsContent />
			</FavoritesProvider>
		</DogViewerProvider>
	)
}
