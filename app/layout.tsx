import './globals.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import Providers from './Providers'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PARK - Your Construction Companion',
  description: 'Park by BuildSuite - Construction Management Application',
  openGraph: {
    images: "https://i.ytimg.com/vi/xJJCN0Xgbig/sddefault.jpg"
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
