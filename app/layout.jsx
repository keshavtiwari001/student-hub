import themeInitScript from '../scripts/theme-init';
import { ThemeProvider } from '../components/ThemeProvider';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import './globals.css';

export const metadata = {
  metadataBase: new URL('https://studenthub.com'),
  title: {
    default: 'StudentHub — Free Calculators & Study Tools for Students',
    template: '%s | StudentHub',
  },
  description:
    'Free, accurate academic calculators and productivity tools for college and school students. Calculate CGPA, GPA, attendance, marks, study plans, and more.',
  keywords: [
    'student tools',
    'attendance calculator',
    'cgpa calculator',
    'gpa calculator',
    'marks calculator',
    'pomodoro timer',
    'study planner',
    'college tools',
  ],
  authors: [{ name: 'StudentHub Team' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://studenthub.com',
    siteName: 'StudentHub',
    title: 'StudentHub — Free Student Tools & Calculators',
    description: 'Calculate attendance, CGPA, GPA, and plan your study schedule with free online tools.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StudentHub — Free Student Tools & Calculators',
    description: 'Calculate attendance, CGPA, GPA, and plan your study schedule with free online tools.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
          suppressHydrationWarning
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans antialiased">
        <ThemeProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
