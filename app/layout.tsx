import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kassa',
  description: 'Kassa App',
  manifest: '/manifest.json',
  icons: { apple: '/next.svg' },
  themeColor: "#01c629"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">

      <body className={inter.className}>{children}</body>
    </html>
  )
}
