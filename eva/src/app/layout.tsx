import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"

const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  title: "EVA Agent",
  description: "AI Chat Assistant",
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${poppins.variable} antialiased`}>
      <body className="bg-gray-100 dark:bg-[#161616] text-gray-800 dark:text-white font-poppins overflow-hidden">
        {children}
      </body>
    </html>
  )
}
