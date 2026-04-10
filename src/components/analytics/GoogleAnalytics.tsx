"use client";

import Script from "next/script";
import { env } from "@/lib/env";

export default function GoogleAnalytics() {
  if (!env.gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${env.gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${env.gaId}');
        `}
      </Script>
    </>
  );
}
