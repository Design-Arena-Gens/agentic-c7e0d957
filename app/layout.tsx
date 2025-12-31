import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Modern Shop - Your Online Store',
  description: 'Shop the latest products at amazing prices',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
