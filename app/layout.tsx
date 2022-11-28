'use client'
import Navbar from './navbar'
import './rootstyles.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <Navbar />
        {children}
        
      </body>
    </html>
  )
}
