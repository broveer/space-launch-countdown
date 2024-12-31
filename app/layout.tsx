import Navbar from '@/components/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Space_Mono } from 'next/font/google'
import Footer from '@/components/Footer'

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-mono',
})

export const metadata: Metadata = {
  title: 'Space Launch Countdown',
  description: 'Countdown to the next space agency rocket launch',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${spaceMono.variable} bg-black text-white`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}

