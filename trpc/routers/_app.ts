import { createTRPCRouter } from '../init'
// import { dogsRouter } from './dogs'

export const appRouter = createTRPCRouter({
	// dogs: dogsRouter,
})

export type AppRouter = typeof appRouter
