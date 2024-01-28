import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from './providers'
import { ThemeModeScript } from 'flowbite-react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kenali Calon Wonosobo',
  description: 'Calon legislatif 2024 area Wonosobo Jawa Tengah',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <ThemeModeScript />
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
