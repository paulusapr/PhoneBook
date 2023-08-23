import './globals.scss'
import 'https://cdnjs.cloudflare.com/ajax/libs/ionicons/4.5.5/css/ionicons.min.css'
import 'react-loading-skeleton/dist/skeleton.css'
import 'react-toastify/dist/ReactToastify.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ApolloWrapper } from 'services/apolloClient'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Phone Book',
  description: 'Simple Phone Book App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloWrapper>
          {children}
        </ApolloWrapper>
      </body>
    </html>
  )
}
