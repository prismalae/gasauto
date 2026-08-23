import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic, Inter, Sora } from "next/font/google";
import { site } from "@/config/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { JsonLd } from "@/components/schema/JsonLd";
import { autoRepairSchema, organizationSchema } from "@/components/schema/schemas";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sora",
  display: "swap",
});

/** Arabic reviews and the Arabic trade name need a proper Arabic face. */
const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
  variable: "--font-arabic-face",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "range rover repair sharjah",
    "german car repair sharjah",
    "car garage sharjah",
    "car pickup and delivery uae",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_AE",
    siteName: site.name,
    url: site.domain,
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: [{ url: "/brand/logo-192.png", sizes: "192x192", type: "image/png" }],
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0c1310",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable} ${plexArabic.variable}`}>
      <head>
        {/*
          Scroll reveals are server-rendered in their hidden state. Without JS
          they would never animate in, so force them visible — content is never
          unreadable because an animation did not run.
        */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="antialiased">
        <JsonLd data={organizationSchema()} />
        <JsonLd data={autoRepairSchema()} />

        <Header />

        <main id="main" className="pt-[var(--header-h)]">{children}</main>

        <Footer />

        {/* Clears the sticky mobile action bar so it never covers the footer. */}
        <div className="h-[4.5rem] md:hidden" aria-hidden="true" />
        <MobileActionBar />
        <WhatsAppFab />
      </body>
    </html>
  );
}
