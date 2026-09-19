import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";
import { ScrollProgress } from "@/components/site/scroll-progress";
import { AmbientBackground } from "@/components/site/ambient-background";
import { BrandIntro } from "@/components/site/brand-intro";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { RouteTransition } from "@/components/providers/route-transition";
import { ContactDialogProvider } from "@/components/contact/contact-dialog";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE_URL, SITE_NAME, SITE_TITLE, SHARE_TITLE, SITE_DESCRIPTION } from "@/lib/site";
import { company } from "@/lib/evara-data";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | EvaraTech",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  keywords: [
    "water intelligence",
    "smart water monitoring",
    "IoT water management",
    "retrofit water metering",
    "borewell water level monitoring",
    "overhead tank monitoring",
    "smart water meter India",
    "non-intrusive water sensor",
    "EvaraTech",
    "EvaraOne",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: company.legalName,
  category: "technology",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SHARE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_IN",
    images: [
      {
        url: "/images/og.jpg",
        width: 1200,
        height: 630,
        alt: "EvaraTech smart water monitoring devices: EvaraFlow, EvaraTank and EvaraValve",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SHARE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/images/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f9fc" },
    { media: "(prefers-color-scheme: dark)", color: "#0a1420" },
  ],
};

// Organization entity. Every property here is a fact the site already
// states; nothing is estimated. `@id` gives the product pages a stable node
// to point their `brand` and `manufacturer` at, so search engines connect
// the seven instruments to one company.
const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  legalName: company.legalName,
  alternateName: "EvaraTech Private Limited",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/images/brand/evaratech-logo.png`,
    width: 512,
    height: 495,
  },
  image: `${SITE_URL}/images/og.jpg`,
  description: SITE_DESCRIPTION,
  slogan: company.tagline,
  email: company.email,
  foundingDate: "2025-10-10",
  founders: company.founders.map((f) => ({
    "@type": "Person",
    name: f.name,
    jobTitle: f.role,
  })),
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: company.email,
    availableLanguage: ["en"],
  },
  areaServed: { "@type": "Country", name: "India" },
  knowsAbout: [
    "Smart water management",
    "IoT water level monitoring",
    "Borewell monitoring",
    "Water meter retrofit",
    "Water quality monitoring",
  ],
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  inLanguage: "en",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <JsonLd data={organizationLd} />
        <JsonLd data={websiteLd} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-evara-teal focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-evara-navy-950"
        >
          Skip to content
        </a>
        <AmbientBackground />
        <BrandIntro />
        <ContactDialogProvider>
          <SmoothScroll>
            <ScrollProgress />
            <SiteNav />
            <main id="main" className="flex-1 pt-20 sm:pt-24">
              <RouteTransition>{children}</RouteTransition>
            </main>
            <SiteFooter />
          </SmoothScroll>
        </ContactDialogProvider>
      </body>
    </html>
  );
}
