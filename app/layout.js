import { Inter } from 'next/font/google';
import './globals.css';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import { ProjectsProvider } from './context/ProjectsContext';
import { ThemeProvider } from './context/ThemeContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Raghul Kannan - Full Stack Developer',
  description: 'Portfolio of Raghul Kannan, a passionate full-stack developer creating modern web applications',
  keywords: 'Full Stack Developer, React, Node.js, MongoDB, JavaScript, Web Development',
  authors: [{ name: 'Raghul Kannan' }],
  creator: 'Raghul Kannan',
  openGraph: {
    title: 'Raghul Kannan - Full Stack Developer',
    description: 'Portfolio of Raghul Kannan, a passionate full-stack developer creating modern web applications',
    url: 'https://raghulkannan.dev',
    siteName: 'Raghul Kannan Portfolio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Raghul Kannan - Full Stack Developer',
    description: 'Portfolio of Raghul Kannan, a passionate full-stack developer creating modern web applications',
    creator: '@raghulkannan_',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased bg-primary text-text-primary min-h-screen`}
      >
        <ErrorBoundary>
          <ThemeProvider>
            <CustomCursor />
            <Navbar />
            <ProjectsProvider>
              <main>
                {children}
              </main>
            </ProjectsProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
