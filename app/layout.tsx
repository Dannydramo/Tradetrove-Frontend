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
