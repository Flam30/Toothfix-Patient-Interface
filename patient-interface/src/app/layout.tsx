import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'

const eina = localFont({
  src: [
    {
      path: '../../public/fonts/Eina01-Bold.ttf',
      weight: '700'
    },
    {
      path: '../../public/fonts/Eina01-SemiBold.ttf',
      weight: '600'
    },
    {
      path: '../../public/fonts/Eina01-Regular.ttf',
      weight: '400'
    }
  ],
  variable: '--font-eina'
})

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Toothfix',
  description: 'Schedule appointments with your dentist online.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${eina.variable} font-sans antialiased`}>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
