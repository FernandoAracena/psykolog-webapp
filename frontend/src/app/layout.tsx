import type { Metadata } from 'next';
import Script from 'next/script'; // 👈 PASO 1: Importar Script
import { AuthProvider } from '@/contexts/AuthContext';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import '../styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.miriampsykolog.no'),
  title: {
    default: 'Psykolog Miriam Heen Skotland | Oslo',
    template: '%s | Miriam Psykolog'
  },
  description: 'Offisiell nettside for Psykolog Miriam Heen Skotland. Terapi og veiledning i Oslo. Bestill time trygt på miriampsykolog.no.',
  keywords: ['Psykolog Miriam', 'Miriam Psykolog', 'Miriam Heen Skotland', 'Psykolog Oslo', 'miriampsykolog.no'],
  authors: [{ name: 'Miriam Heen Skotland' }],
  creator: 'Miriam Heen Skotland',
  publisher: 'Miriam Heen Skotland',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Psykolog Miriam Heen Skotland',
    description: 'Offisiell nettside. Terapi og veiledning i Oslo.',
    url: 'https://www.miriampsykolog.no',
    siteName: 'Miriam Psykolog',
    locale: 'no_NO',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="no">
      {/* 👈 Opcional: El script principal también podría ir aquí, usando el componente Head de next/head */}
      <body>
        
        {/* 👈 PASO 2: Insertar los bloques de Script de GA4 aquí, 
           dentro del <body>, usando el ID G-Q0KSKKHBCM */}
        
        {/* 1. Carga el script principal de GA4 */}
        <Script
          strategy="afterInteractive" // Carga después de que la página sea interactiva (mejor rendimiento)
          src="https://www.googletagmanager.com/gtag/js?id=G-Q0KSKKHBCM" 
        />
        
        {/* 2. Configura la capa de datos (dataLayer) y el ID de configuración */}
        <Script
          id='google-analytics-config'
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-Q0KSKKHBCM');
            `,
          }}
        />

        <AuthProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}