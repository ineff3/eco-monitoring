import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Open_Sans } from 'next/font/google'
import './globals.css'

const openSans = Open_Sans({ subsets: ['latin'] })

const corbel = localFont({
  src: [
    {
      path: '../public/fonts/CORBEL.ttf',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../public/fonts/CORBELB.ttf',
      weight: '700',
      style: 'normal'
    }

  ]

})

export const metadata: Metadata = {
  title: 'Env-Monitoring',
  description: 'Monitoring the environment',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={corbel.className}>{children}</body>
    </html>
  )
}
