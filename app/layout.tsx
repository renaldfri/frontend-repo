"use client";

import { Provider } from 'react-redux';
import { Inter } from 'next/font/google'
import ThemeRegistry from '../theme/ThemeRegistry';

import store from '../store/store';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <ThemeRegistry>{children}</ThemeRegistry>
        </Provider>
      </body>
    </html>
  )
}
