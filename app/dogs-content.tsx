'use client'

import Image from 'next/image'
import { useDogViewer } from './dog-viewer-context'
import { useFavorites } from './favorites-context'
import { FavoritesSidebar } from './favorites-sidebar'

export function DogsContent() {
	const { dogs, mainDog, setMainDog } = useDogViewer()
	const { isFavorite, addFavorite, removeFavorite } = useFavorites()
	const mainIsFavorite = isFavorite(mainDog)

	return (
		<div className="flex w-full max-w-5xl gap-8">
			<div className="flex flex-1 flex-col items-center justify-center gap-4">
				<section className="flex w-full flex-col items-center justify-center">
					<Image
						src={mainDog.image}
						alt={mainDog.breed}
						width={200}
						height={250}
						priority
						className="h-[250px] w-[200px] object-cover"
					/>
					<p className="font-bold text-2xl">{mainDog.breed}</p>
					<button
						type="button"
						onClick={() =>
							mainIsFavorite ? removeFavorite(mainDog) : addFavorite(mainDog)
						}
						className={`mt-2 rounded bg-amber-500 px-4 py-2 font-medium text-sm text-white hover:bg-amber-600 hover:opacity-90`}
					>
						{mainIsFavorite ? 'Remove from favorites' : 'Add to favorites'}
					</button>
				</section>

				<section className="grid grid-cols-2 gap-4 md:grid-cols-4">
					{dogs.map((dog) => (
						<div
							key={dog.image}
							className="flex flex-col items-center justify-center"
						>
							<Image
								src={dog.image}
								alt={dog.breed}
								width={80}
								height={100}
								priority
								className="relative z-0 h-[100px] w-[80px] cursor-pointer object-cover transition-transform duration-200 ease-out hover:z-10 hover:scale-110"
								onClick={() => setMainDog(dog)}
							/>
							{dog.breed}
						</div>
					))}
				</section>
			</div>

			<FavoritesSidebar />
		</div>
	)
}
