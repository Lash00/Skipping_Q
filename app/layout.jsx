import React from "react";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata = {
  title: "Skipping Queue - دليلك لأقرب خدمة",
  description:
    " تطبيق ذكي للبحث عن الخدمات الحكومية والبنكية بالقرب منك و تفادي الطوابير ",
  icons: {
    icon: [
      {
        url: "/logo.jpg",
        media: "(prefers-color-scheme: light)",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="font-sans antialiased" style={{ direction: "rtl" }}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
