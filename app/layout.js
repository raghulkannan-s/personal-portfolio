import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ErrorBoundary from "./components/ErrorBoundary";
import ScrollProgress from "./components/ScrollProgress";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import './globals.css'
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';

export const metadata = {
  title: 'Raghul Kannan - Full Stack Developer',
  description: 'Portfolio of Raghul Kannan, a passionate full-stack developer creating modern web applications.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-primary text-text-primary min-h-screen`}
      >
        <ErrorBoundary>
        <CustomCursor />
          <ScrollProgress />
          <Navbar />
          <main>
            {children}
          </main>
        </ErrorBoundary>
      </body>
    </html>
  );
}
