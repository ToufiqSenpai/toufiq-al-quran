'use client'
import Navbar from '../layouts/navbar'
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
