'use client'

import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useMemo,
	useState,
} from 'react'
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

function persistFavorites(favorites: Dog[]) {
	fetch('/api/favorites', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ favorites }),
	}).catch(() => {})
}

export function FavoritesProvider({
	children,
	initialFavorites = [],
}: {
	children: ReactNode
	initialFavorites?: Dog[]
}) {
	const [favorites, setFavorites] = useState<Dog[]>(initialFavorites)

	const addFavorite = useCallback(
		(dog: Dog) => {
			if (favorites.some((f) => isSameDog(f, dog))) return
			const next = [...favorites, dog]
			setFavorites(next)
			persistFavorites(next)
		},
		[favorites],
	)

	const removeFavorite = useCallback(
		(dog: Dog) => {
			const next = favorites.filter((f) => !isSameDog(f, dog))
			setFavorites(next)
			persistFavorites(next)
		},
		[favorites],
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
