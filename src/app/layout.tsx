import '@/app/globals.scss'
import CategoryNav from '@/components/CategoryNav'
import { ApolloWrapper } from '@/lib/apollo/ApolloProvider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'

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
    <html lang="en">
      <ApolloWrapper>
        <body className={inter.className}>
          <link
            rel="stylesheet"
            href={`${process.env.MAGENTO_BASE_URL}/media/styles.css`}
          />
          <link
            rel="stylesheet"
            href={`${process.env.MAGENTO_STYLESHEETS_BASE_URL}/styles-m.css`}
          />
          <link
            rel="stylesheet"
            href={`${process.env.MAGENTO_STYLESHEETS_BASE_URL}/styles-l.css`}
          />
          <div>
            <div className="h-40 md:w-full md:max-w-[1280px] mx-auto px-[15px] md:px-[20px] flex items-center justify-between">
              <Link href="/">
                <Image
                  alt="logo"
                  src="/next.svg"
                  width={160}
                  height={40}
                  priority
                  className="w-[160px] h-auto"
                />
              </Link>
            </div>
          </div>
          <CategoryNav />
          <div className="md:w-full md:max-w-[1280px] mx-auto px-[15px] md:px-[20px] mt-6">
            {children}
          </div>
        </body>
      </ApolloWrapper>
    </html>
  )
}
