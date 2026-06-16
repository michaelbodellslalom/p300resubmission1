import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Media & Comms Corp Dashboard',
  description: 'Real-time operational dashboard for content strategists and audience insights managers',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100">
        {children}
      </body>
    </html>
  );
}
