import Script from "next/script";
import { site } from "@/config/site";

/**
 * Google Ads (gtag.js). Loads after hydration so it never competes with the
 * page's own JS for the first paint. Renders nothing when no ID is set.
 */
export function GoogleTag() {
  if (!site.googleAdsId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${site.googleAdsId}`}
        strategy="afterInteractive"
      />
      <Script id="google-tag-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${site.googleAdsId}');`}
      </Script>
    </>
  );
}
