import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { RevealController } from '@/components/RevealController';
import { site } from '@/content/site';
import { projects } from '@/content/projects';
import { indexable } from '@/lib/indexing';
import './globals.css';

const serif = localFont({
  src: [{ path: '../fonts/newsreader-roman.woff2', style: 'normal', weight: '260 520' }],
  variable: '--font-serif',
  display: 'swap',
  fallback: ['Georgia', 'serif'],
  adjustFontFallback: 'Times New Roman',
});

const sans = localFont({
  src: '../fonts/jost.woff2',
  weight: '100 900',
  variable: '--font-sans',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
  adjustFontFallback: 'Arial',
});

const description =
  'MACK & Co Architects is a studio for architecture, interiors and objects in Andheri West, Mumbai, with work across Rajasthan and Gujarat.';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.tagline}`, template: `%s — ${site.name}` },
  description,
  applicationName: site.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: site.locale,
    title: `${site.name} — ${site.tagline}`,
    description,
    url: '/',
    images: [{ url: '/og/home.jpg', width: 1200, height: 630, alt: 'Udaipur Resort by MACK & Co Architects' }],
  },
  twitter: { card: 'summary_large_image' },
  formatDetection: { telephone: false, email: false, address: false },
  robots: indexable ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: '#efece6',
  colorScheme: 'light',
};

const orgLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${site.url}/#studio`,
  name: site.name,
  alternateName: 'MACK',
  description,
  slogan: site.tagline,
  url: site.url,
  logo: `${site.url}/icon.svg`,
  image: `${site.url}/og/home.jpg`,
  email: site.email,
  telephone: '+91-9998000393',
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  hasMap: site.mapUrl,
  sameAs: [site.instagram.url],
  knowsAbout: ['Architecture', 'Interior design', 'Furniture design'],
  subjectOf: projects.slice(0, 5).map((p) => ({ '@type': 'CreativeWork', name: p.title, url: `${site.url}/projects/${p.slug}` })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        {/* The italic is used on few pages (a quote, the current menu item): it joins the same
            family but is not preloaded, so the browser fetches it only where italic text renders. */}
        <style>{`@font-face{font-family:${serif.style.fontFamily.split(',')[0]};src:url(/fonts/newsreader-italic.woff2) format('woff2');font-style:italic;font-weight:300 440;font-display:swap}`}</style>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
      </head>
      <body>
        <a href="#main" className="skip">Skip to content</a>
        <Header />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <RevealController />
      </body>
    </html>
  );
}
