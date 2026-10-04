import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  title: "IIFN | Online Fitness Certification & Science-Based Education",
  description:
    "The Gold Standard in Professional Online Fitness Education. Science-based online excellence at the Indian Institute of Fitness & Nutrition.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@400;600;700;800;900&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-on-surface font-body overflow-x-hidden">
        <div className="h-screen w-full bg-nutral-850 flex justify-center items-center">
          <span className="text-white font-bold">Website is currently under maintenance.</span>
        </div>
        {/* {children} */}
        {/* <Analytics /> */}
      </body>
    </html>
  );
}
