import './globals.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import Head from 'next/head'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BuildSuite',
  description: 'Construction Management Application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <body className={montserrat.className}>{children}</body>
    </html>
  )
}
