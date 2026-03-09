import type { Metadata } from 'next'
import './globals.css'
import { TRPCReactProvider } from '~/trpc/client'

export const metadata: Metadata = {
	title: 'Dog App',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body>
				<TRPCReactProvider>{children}</TRPCReactProvider>
			</body>
		</html>
	)
}
