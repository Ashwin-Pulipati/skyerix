import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import Scroller from "@/components/ui/scroller";
import { Toaster } from "@/components/ui/sonner";
import "leaflet/dist/leaflet.css";
import type { Metadata } from "next";
import { ThemeProvider as NextJSThemeProvider } from "next-themes";
import { Andika, Nunito, Poppins } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const andika = Andika({
  variable: "--font-andika",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Skyerix",
    template: `%s - Skyerix`,
  },
  description:
    "A comprehensive web application for real-time weather updates and forecasts.",
  keywords: [
    "Weather",
    "Forecast",
    "Real-time weather",
    "Weather app",
    "Next.js",
    "React",
    "TypeScript",
    "OpenWeatherMap",
    "Geolocation",
  ],
  authors: [
    { name: "Ashwin Pulipati", url: "https://github.com/Ashwin-Pulipati" },
  ],
  creator: "Ashwin Pulipati",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://skyerix.vercel.app/", 
    title: "Skyerix",
    description:
      "A comprehensive web application for real-time weather updates and forecasts.",
    siteName: "Skyerix",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${andika.variable} ${poppins.variable} ${nunito.variable} antialiased`}
      >
        <NextJSThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <Providers>
            <Header />
            <main className="min-h-screen container mx-auto max-w-7xl px-4 py-8">
              {children}
            </main>
            <Footer />
            <Scroller />
            <Toaster position="top-right" richColors closeButton />
          </Providers>
        </NextJSThemeProvider>
      </body>
    </html>
  );
}
