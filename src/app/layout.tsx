'use client';
import React from "react";
import './globals.css'
import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient();

type RootLayoutPropType = {
  children: React.ReactNode
}

export default function RootLayout(props: RootLayoutPropType) {
  return (
    <html lang="en">
    <QueryClientProvider client={queryClient}>
      <body>{props.children}</body>
    </QueryClientProvider>
    </html>
  )
}
