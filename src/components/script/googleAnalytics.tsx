import Script from "next/script";
import { GA_ID } from "@/lib/gtag";

const GoogleAnalytics = () => {
  if (!GA_ID) {
    return null;
  }

  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        defer
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga" defer strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
          function gtag() { dataLayer.push(arguments); }
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { page_path: window.location.pathname });
          `}
      </Script>
    </>
  );
};

export default GoogleAnalytics;
