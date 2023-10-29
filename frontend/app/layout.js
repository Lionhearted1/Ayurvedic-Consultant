import { Inter } from 'next/font/google'
import './globals.css'



const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Ayurvedic-Consultant',
  description: 'App that recommends medicines',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-cover bg-no-repeat bg-center" style={{backgroundImage: `url('/pic1.jpg')`}}>
          {children}
      </body>
    </html>
  )
}
