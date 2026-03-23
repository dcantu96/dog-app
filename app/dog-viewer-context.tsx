'use client'

import {
	createContext,
	type ReactNode,
	useContext,
	useMemo,
	useState,
} from 'react'
import type { Dog } from './dog'

export type { Dog }

type DogViewerContextValue = {
	mainDog: Dog
	setMainDog: (dog: Dog) => void
	dogs: Dog[]
}

const DogViewerContext = createContext<DogViewerContextValue | null>(null)

export function DogViewerProvider({
	children,
	dogs,
}: {
	children: ReactNode
	dogs: Dog[]
}) {
	const [mainDog, setMainDog] = useState<Dog | null>(null)

	const defaultMainDog = dogs[dogs.length - 1]
	const currentMainDog = mainDog ?? defaultMainDog

	const thumbnailDogs = useMemo(() => dogs.slice(0, -1), [dogs])

	const value = useMemo<DogViewerContextValue>(
		() => ({
			mainDog: currentMainDog,
			setMainDog,
			dogs: thumbnailDogs,
		}),
		[currentMainDog, thumbnailDogs],
	)

	return (
		<DogViewerContext.Provider value={value}>
			{children}
		</DogViewerContext.Provider>
	)
}

export function useDogViewer(): DogViewerContextValue {
	const ctx = useContext(DogViewerContext)
	if (ctx === null) {
		throw new Error('useDogViewer must be used inside DogViewerProvider')
	}
	return ctx
}
