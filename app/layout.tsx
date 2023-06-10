import '@/styles/globals.css';
import { Inter } from 'next/font/google';

import Providers from '@/components/Providers';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/Toast';

import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        'bg-my-color1 text-my-color10 antialiased',
        inter.className,
      )}
    >
      <body className="min-h-screen bg-my-color3 dark:bg-my-color10 antialiased">
        <Providers>
          {/* @ts-expect-error Server Component */}
          <NavBar />
          <Toaster position="bottom-right" />
          <main>
            <section className="pt-0">{children}</section>
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
