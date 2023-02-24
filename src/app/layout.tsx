import React from "react";
import './globals.css'

export const metadata = {
  title: 'English App',
  description: 'Study English from word every day',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
