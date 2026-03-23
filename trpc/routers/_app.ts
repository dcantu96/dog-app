import { createTRPCRouter } from '../init'
import { dogsRouter } from './dogs'
import { favoritesRouter } from './favorites'

export const appRouter = createTRPCRouter({
	dogs: dogsRouter,
	favorites: favoritesRouter,
})

export type AppRouter = typeof appRouter
