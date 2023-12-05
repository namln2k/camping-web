import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

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
        <div className="md:w-full md:max-w-[1280px] mx-auto px-[15px] md:px-[20px]">
          {children}
        </div>
      </body>
    </html>
  )
}
