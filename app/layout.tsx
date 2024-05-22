import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    metadataBase: new URL('https://tradetrove.vercel.app'),
    title: 'Tradetrove',
    description:
        'Welcome to Tradetrove - Your trusted marketplace for unique and valuable items.',
    twitter: {
        card: 'summary_large_image',
        title: 'Tradetrove',
        description:
            'Welcome to Tradetrove - Your trusted marketplace for unique and valuable items.',
        images: ['https://tradetrove.vercel.app/og-image.png'],
    },
    openGraph: {
        title: 'Tradetrove',
        description:
            'Welcome to Tradetrove - Your trusted marketplace for unique and valuable items.',
        url: 'https://tradetrove.vercel.app',
        siteName: 'Tradetrove',
        images: [
            {
                url: 'https://tradetrove.vercel.app/og-image.png',
                width: 800,
                height: 600,
                alt: 'Tradetrove - Unique and valuable items',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-[#F6F8FF] min-h-screen`}>
                <Toaster position="top-right" richColors />
                {children}
            </body>
        </html>
    );
}
