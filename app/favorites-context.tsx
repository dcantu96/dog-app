'use client'

import { useMutation } from '@tanstack/react-query'
import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useMemo,
	useState,
} from 'react'
import { useTRPC } from '~/trpc/client'
import type { Dog } from './dog-viewer-context'

type FavoritesContextValue = {
	favorites: Dog[]
	isFavorite: (dog: Dog) => boolean
	addFavorite: (dog: Dog) => void
	removeFavorite: (dog: Dog) => void
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null)

function isSameDog(a: Dog, b: Dog) {
	return a.image === b.image && a.breed === b.breed
}

export function FavoritesProvider({
	children,
	initialFavorites = [],
}: {
	children: ReactNode
	initialFavorites?: Dog[]
}) {
	const trpc = useTRPC()
	const [favorites, setFavorites] = useState<Dog[]>(initialFavorites)
	const { mutate } = useMutation(trpc.favorites.set.mutationOptions())

	const addFavorite = useCallback(
		(dog: Dog) => {
			if (favorites.some((f) => isSameDog(f, dog))) return
			const next = [...favorites, dog]
			setFavorites(next)
			mutate({ favorites: next })
		},
		[favorites, mutate],
	)

	const removeFavorite = useCallback(
		(dog: Dog) => {
			const next = favorites.filter((f) => !isSameDog(f, dog))
			setFavorites(next)
			mutate({ favorites: next })
		},
		[favorites, mutate],
	)

	const isFavorite = useCallback(
		(dog: Dog) => favorites.some((f) => isSameDog(f, dog)),
		[favorites],
	)

	const value = useMemo<FavoritesContextValue>(
		() => ({ favorites, isFavorite, addFavorite, removeFavorite }),
		[favorites, isFavorite, addFavorite, removeFavorite],
	)

	return (
		<FavoritesContext.Provider value={value}>
			{children}
		</FavoritesContext.Provider>
	)
}

export function useFavorites(): FavoritesContextValue {
	const ctx = useContext(FavoritesContext)
	if (ctx === null) {
		throw new Error('useFavorites must be used inside FavoritesProvider')
	}
	return ctx
}
