import type { Metadata } from 'next';
import { AuthProvider } from '@/contexts/AuthContext';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'MiriamPsykolog',
  description: 'Psykolog Miriam Heen Skotland - Terapi og veiledning i Oslo',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="no">
      <body>
        <AuthProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}