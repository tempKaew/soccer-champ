import '@styles/globals.css'
import { Bai_Jamjuree } from '@next/font/google'

const font_bai = Bai_Jamjuree({
  weight: ['300', '500'],
  style: ['normal'],
  subsets: ['thai', 'latin'],
  variable: '--font-bai'
})

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${font_bai.variable} font-sans`}>{children}</body>
    </html>
  )
}
