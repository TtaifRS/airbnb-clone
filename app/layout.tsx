import {Nunito} from 'next/font/google'
import './globals.css'
import Navbar from './components/navbar/Navbar'
import ClientOnly from './components/CLientOnly'
import RegisterModal from './components/Modal/RegisterModal'
import ToasterProvider from './provider/ToasterProvider'
import LoginModal from './components/Modal/LoginModal'
import getCurrentUser from './actions/getCurrentUser'
import RentModal from './components/Modal/RentModal'

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
}

const font = Nunito({
  subsets: ['latin']
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const currentUser = await getCurrentUser()

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider/>
          <RentModal/>
          <LoginModal/>
          <RegisterModal/>
          <Navbar currentUser={currentUser} />
        </ClientOnly>
    
        {children}
        </body>
    </html>
  )
}
