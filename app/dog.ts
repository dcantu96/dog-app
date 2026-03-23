import z from 'zod'

export const dogSchema = z.object({
	image: z.string(),
	breed: z.string(),
})

export type Dog = z.infer<typeof dogSchema>
