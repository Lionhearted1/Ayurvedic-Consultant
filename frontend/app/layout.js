"use client";
import { useRouter } from 'next/navigation';
import './globals.css';
import Background from './components/Background'; 
import NavigationBar from './components/NavigationBar'; 
import { useEffect, useState } from 'react';



const excludedRoutes = ['/login', '/register-1','/register-2']; 

export default function RootLayout({ children }) {
  const router = useRouter();
  const currentRoute = router.pathname;
  const [shouldDisplayNavigationBar,setShouldDisplayNavigationBar]=useState(false);

useEffect(()=>{
  if(!excludedRoutes.includes(currentRoute)){
    setShouldDisplayNavigationBar(true)
   }
   else{
    setShouldDisplayNavigationBar(false)
   }
},[])
      



  return (
    <html lang="en">
      <body className={shouldDisplayNavigationBar ? 'with-navbar' : ''}>
        {shouldDisplayNavigationBar && <NavigationBar />}
        {currentRoute === '/' ? <Background /> : <div className="bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url('/pic1.jpg')` }}>{children}</div>}
      </body>
    </html>
  );

}
