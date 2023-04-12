'use client';
import React from "react";
import {QueryClient, QueryClientProvider} from 'react-query';
import {Analytics} from '@vercel/analytics/react';
import './globals.css'
import '@/shared/styles/navbar.style.scss'
import "@/app/review/Review.style.scss"
import {Roboto} from '@next/font/google';

const roboto = Roboto({
  // Specifying weight is only required for non-variable fonts.
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

const queryClient = new QueryClient();

type RootLayoutPropType = {
  children: React.ReactNode
}

export default function RootLayout(props: RootLayoutPropType) {
  return (
    <html lang="en" className={roboto.className}>
    <QueryClientProvider client={queryClient}>
      <body>
      {props.children}
      <Analytics/>
      </body>
    </QueryClientProvider>
    </html>
  )
}