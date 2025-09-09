import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Finances Tracker',
  description: 'Track your personal finances and achieve your financial goals.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
