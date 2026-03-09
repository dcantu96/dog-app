'use client'

import {
	createContext,
	type ReactNode,
	useContext,
	useMemo,
	useState,
} from 'react'

type Dog = { image: string; breed: string }

type MainDogContextValue = {
	/** Current main dog id (user choice or first in list). */
	mainDog: Dog
	/** Set the main dog (e.g. when user clicks "Set as main"). */
	setMainDog: (dog: { image: string; breed: string }) => void
	/** Full list from the single fetch (so we can find main + others). */
	dogs: Dog[]
}

const MainDogContext = createContext<MainDogContextValue | null>(null)

export function MainDogProvider({
	children,
	dogs,
}: {
	children: ReactNode
	dogs: Dog[]
}) {
	const [mainDog, setMainDog] = useState<Dog | null>(null)

	const defaultMainDog = dogs[0]
	const currentMainDog = mainDog ?? defaultMainDog

	const value = useMemo<MainDogContextValue>(
		() => ({
			mainDog: currentMainDog,
			setMainDog,
			dogs: dogs.filter(
				(dog) =>
					dog.breed !== currentMainDog?.breed &&
					dog.image !== currentMainDog?.image,
			),
		}),
		[currentMainDog, dogs],
	)

	return (
		<MainDogContext.Provider value={value}>{children}</MainDogContext.Provider>
	)
}

export function useMainDog(): MainDogContextValue {
	const ctx = useContext(MainDogContext)
	if (ctx === null) {
		throw new Error('useMainDog must be used inside MainDogProvider')
	}
	return ctx
}
