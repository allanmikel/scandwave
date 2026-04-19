import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Serif } from "next/font/google";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  variable: "--font-sans-custom",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono-custom",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const plexSerif = IBM_Plex_Serif({
  variable: "--font-serif-custom",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://scandwave.com"),
  title: {
    default: "ScandWave Energy",
    template: "%s — ScandWave Energy",
  },
  description:
    "ScandWave Energy AB — a research-based wave energy concept moving from simulation to verified prototype.",
  applicationName: "ScandWave Energy",
  authors: [{ name: "Scand Wave Energy AB" }],
  creator: "Scand Wave Energy AB",
  publisher: "Scand Wave Energy AB",
  formatDetection: { telephone: false, address: false, email: false },
  openGraph: {
    type: "website",
    siteName: "ScandWave Energy",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0f2336",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      suppressHydrationWarning
      className={`${plexSans.variable} ${plexMono.variable} ${plexSerif.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
