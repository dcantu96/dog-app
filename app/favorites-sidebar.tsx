'use client'

import Image from 'next/image'
import { useDogViewer } from './dog-viewer-context'
import { useFavorites } from './favorites-context'

export function FavoritesSidebar() {
	const { setMainDog } = useDogViewer()
	const { favorites, removeFavorite } = useFavorites()

	return (
		<aside className="w-56 shrink-0 pl-6">
			<h2 className="mb-3 font-semibold text-zinc-800">Favorites</h2>
			{favorites.length === 0 ? (
				<p className="text-sm text-zinc-500">No favorites yet.</p>
			) : (
				<ul className="flex flex-col gap-3">
					{favorites.map((dog) => (
						<li
							key={dog.image}
							className="flex items-center gap-2 rounded border border-zinc-200 bg-white p-2"
						>
							<button
								type="button"
								onClick={() => setMainDog(dog)}
								className="flex min-w-0 flex-1 items-center gap-2 text-left"
							>
								<Image
									src={dog.image}
									alt={dog.breed}
									width={40}
									height={40}
									className="h-10 w-10 shrink-0 object-cover"
								/>
								<span className="truncate text-sm">{dog.breed}</span>
							</button>
							<button
								type="button"
								onClick={() => removeFavorite(dog)}
								className="shrink-0 rounded px-1 py-0.5 text-zinc-500 hover:bg-zinc-100 hover:text-red-600"
								title="Remove from favorites"
							>
								×
							</button>
						</li>
					))}
				</ul>
			)}
		</aside>
	)
}
