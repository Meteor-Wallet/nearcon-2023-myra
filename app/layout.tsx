import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Provider from './Provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Myra Bot',
    description: 'Near Protocol Bot',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Provider>
            <html lang='en'>
                <body className={inter.className}>{children}</body>
            </html>
        </Provider>
    );
}
