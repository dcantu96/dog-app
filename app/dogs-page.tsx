'use client'

import { useQuery } from '@tanstack/react-query'
import { useTRPC } from '~/trpc/client'
import { DogsContent } from './dogs-content'
import { MainDogProvider } from './main-dog-context'

export function DogsPage() {
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
		<MainDogProvider dogs={dogs}>
			<DogsContent />
		</MainDogProvider>
	)
}
