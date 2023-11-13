import './globals.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import Providers from './Providers'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PARK - Your Construction Companion',
  description: 'Park by BuildSuite - Construction Management Application',
  icons: '/favicon.ico',
  metadataBase: new URL('https://bs-llm.vercel.app'),
  themeColor: {
    color: '#ffffff'
  },
  openGraph: {
    images: "https://bs-llm.vercel.app/_next/image?url=%2F3d-logo.png&w=256&q=75"
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
