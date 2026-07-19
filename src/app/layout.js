import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

const montserrat = Montserrat({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "IIFN | Online Fitness Certification & Science-Based Education",
  description:
    "The Gold Standard in Professional Online Fitness Education. Science-based online excellence at the Indian Institute of Fitness & Nutrition.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark h-full antialiased">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${montserrat.variable} ${inter.variable} min-h-full flex flex-col bg-background text-on-surface font-body overflow-x-hidden`}
      >
        {children}
        {/* <div className="h-screen w-full bg-neutral-900 text-shadow-white  flex flex-col justify-center items-center">
          <span className="text-2xl font-semibold">SERVER UNDER MAINTENANCE</span>
          <span className="text-sm text-red-600">error 503</span>
        </div> */}
      </body>
    </html>
  );
}
