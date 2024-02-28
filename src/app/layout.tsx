import StoreProvider from '@/app/StoreProvider'
import '@/app/globals.scss'
import CategoryNav from '@/components/CategoryNav'
import GlobalMessage from '@/components/GlobalMessage'
import Header from '@/components/header'
import { ApolloWrapper } from '@/lib/apollo/ApolloProvider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Camping Web',
  description: 'Camping Web',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <ApolloWrapper>
        <StoreProvider>
          <body suppressHydrationWarning={true} className={inter.className}>
            <GlobalMessage />
            <Header className='h-24 md:w-full md:max-w-[1440px] mx-auto px-[15px] md:px-[20px] flex items-center justify-between' />
            <CategoryNav />
            <div className='md:w-full md:max-w-[1440px] mx-auto px-[15px] md:px-[20px] mt-6'>
              {children}
            </div>
          </body>
        </StoreProvider>
      </ApolloWrapper>
    </html>
  )
}
