import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'SD Prospects — San Diego County Football Recruiting Database',
    template: '%s | SD Prospects',
  },
  description:
    "San Diego County's football recruiting database. Rankings, player profiles, offers, and commitments for the top prospects from every school in San Diego County.",
  keywords: [
    'San Diego football recruiting',
    'San Diego County football prospects',
    'SD football rankings',
    'San Diego high school football 2026',
    'San Diego high school football 2027',
    'CIF San Diego football',
    'SD prospects',
    'San Diego football commits',
    'San Diego recruiting database',
    '619 football',
  ],
  metadataBase: new URL('https://sandiegoprospects.com'),
  openGraph: {
    type: 'website',
    siteName: 'SD Prospects',
    title: 'SD Prospects — San Diego County Football Recruiting Database',
    description: "San Diego County's football recruiting database. Rankings, player profiles, offers, and commitments for the top prospects in the county.",
    url: 'https://sandiegoprospects.com',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SD Prospects — San Diego County Football Recruiting',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@SDProspectsFB',
    creator: '@SDProspectsFB',
    title: 'SD Prospects — San Diego County Football Recruiting Database',
    description: "San Diego County's football recruiting database. Rankings, player profiles, offers, and commitments.",
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: 'https://sandiegoprospects.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
