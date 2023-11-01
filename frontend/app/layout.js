"use client";
import { useRouter } from 'next/navigation';
import { Inter } from 'next/font/google';
import './globals.css';
import Background from './components/Background'; // Import the Background component
import { ResDataContextProvider } from './context/resDataContextProvider';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  const router = useRouter();

  // Check if the current route is the front page
  const isFrontPage = router.pathname === '/';

  // Render background video only for the front page
  if (isFrontPage) {
    return (
      <html lang="en">
        <body>
          <Background /> {/* Render the Background component only for the front page */}
          {children}
        </body>
      </html>
    );
  }

  if (!isFrontPage) {
    return (
      <html lang="en">
        <body className="bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url('/pic1.jpg')` }}>
        <ResDataContextProvider>
          {children}
          </ResDataContextProvider>
        </body>
      </html>
    );
  }

  // Render other pages without the background video
  return (
    <html lang="en">
      <body>

        <ResDataContextProvider>
          {children}
        </ResDataContextProvider>
      </body>
    </html>
  );
}
