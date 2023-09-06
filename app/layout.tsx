import { ReduxProvider } from '@/providers/ReduxProvider'
import './(styles)/globals.scss'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kassa',
  description: 'Kassa App',
  manifest: '/manifest.json',
  viewport: { width: 'device-width', initialScale: 1.0, minimumScale: 1.0, userScalable: false },
  icons: { apple: '/next.svg' },
  themeColor: "#101010"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  )
}
