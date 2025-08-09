import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ClientLayout from '@/components/ClientLayout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FlipMart - Your One-Stop Shop',
  description: 'Discover amazing products at great prices. Shop electronics, fashion, home goods and more on FlipMart.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <body className={inter.className}>
  <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
