"use client";
import { useRouter } from 'next/navigation';
import { Inter } from 'next/font/google';
import './globals.css';
import Background from './components/Background'; 
import NavigationBar from './components/NavigationBar'; 



const inter = Inter({ subsets: ['latin'] });

const excludedRoutes = ['./login', './register']; 

export default function RootLayout({ children }) {
  const router = useRouter();
  const currentRoute = router.pathname;
  const shouldDisplayNavigationBar = !excludedRoutes.includes(currentRoute);


  return (
    <html lang="en">
      <body className={shouldDisplayNavigationBar ? 'with-navbar' : ''}>
        {shouldDisplayNavigationBar && <NavigationBar />}
        {currentRoute === '/' ? <Background /> : <div className="bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url('/pic1.jpg')` }}>{children}</div>}
      </body>
    </html>
  );

}
