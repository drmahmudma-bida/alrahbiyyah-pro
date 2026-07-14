import { ClerkProvider } from '@clerk/nextjs'

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Al-Rahbiyyah Pro | Islamic Inheritance Calculator',
  description: 'The world’s first smart Fara’id ecosystem powered by the foundational texts of all four Sunni Madhabs. Calculate Shariah-compliant estate distributions instantly.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
      <body className={inter.className}>
        {children}
        {/* This single line tracks all your visitors automatically! */}
        <Analytics />
      </body>
    </html>
  </ClerkProvider>
  )
}