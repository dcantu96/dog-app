import z from 'zod'
import { baseProcedure, createTRPCRouter } from '../init'

export const dogsRouter = createTRPCRouter({
	getRandomDogs: baseProcedure
		.input(z.number().min(1).max(50))
		.query(async ({ input }): Promise<{ image: string; breed: string }[]> => {
			const response = await fetch(
				`https://dog.ceo/api/breeds/image/random/${input}`,
			)
			const data = await response.json()
			console.log('called getRandomDogs')
			if (data.status !== 'success') {
				throw new Error('Failed to fetch random dogs')
			}

			if (!data.message || data.message.length === 0) {
				throw new Error('No random dogs found')
			}

			return data.message.map((image: string) => ({
				image,
				// https://images.dog.ceo/breeds/{breed-subbreed}/{filename}.jpg
				breed: image.split('/').at(4)?.split('-').join(' ') ?? '',
			}))
		}),
})
