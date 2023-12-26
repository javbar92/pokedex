import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/header/page'
import SideBar from '@/components/sidebar/page'
export const dynamic = "force-dynamic";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pokedex',
  description: 'Pokedex built for practice purposes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {<Header />}
        <div className='body-container'>
          {/* {<SideBar />} */}
          {children}
        </div>
      </body>
    </html>
  )
}
