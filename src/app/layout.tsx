import type { Metadata } from "next";
import { Lato, Roboto, Montserrat, Open_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { BuilderWrapper } from "@/components/BuilderWrapper";

// Access Hire Australia fonts
const lato = Lato({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-lato",
  display: "swap",
});

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

// Access Express fonts
const montserrat = Montserrat({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const openSans = Open_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SMS Demo - Offhire Notifications",
  description: "SMS notification system for offhire using Builder.io, Vercel, and Iterable",
  robots: {
    index: false,
    follow: false,
  },
};

const BUILDER_API_KEY = process.env.NEXT_PUBLIC_BUILDER_API_KEY;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lato.variable} ${roboto.variable} ${montserrat.variable} ${openSans.variable} antialiased`}
      >
        <BuilderWrapper>{children}</BuilderWrapper>
        {/* Builder.io Visual Editor Script */}
        <Script
          src="https://cdn.builder.io/js/webcomponents"
          strategy="afterInteractive"
        />
        <Script id="builder-init" strategy="afterInteractive">
          {`
            if (typeof Builder !== 'undefined') {
              Builder.init('${BUILDER_API_KEY}');
            }
          `}
        </Script>
      </body>
    </html>
  );
}
