import Script from "next/script";

const gaId = process.env.NEXT_PUBLIC_GA_ID;
const rawGtmId = process.env.NEXT_PUBLIC_GTM_ID;
// Only load GTM for a real container ID (GTM-XXXX). When the GTM var holds the
// GA4 measurement ID (G-...), gtm.js would just load gtag a second time.
const gtmId = rawGtmId && rawGtmId.startsWith("GTM-") ? rawGtmId : undefined;

// Analytics load with strategy "lazyOnload" (after window load / browser idle)
// so they never compete with the hero for bandwidth or main-thread time.
// The gtag stub queues commands, so the page_view from gtag('config') still fires.
export default function TrackingScripts() {
  return (
    <>
      {gtmId ? (
        <Script id="gtm-init" strategy="lazyOnload">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `}
        </Script>
      ) : null}

      {gaId ? (
        <>
          <Script id="ga-init" strategy="lazyOnload">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = window.gtag || gtag;
              gtag('js', new Date());
              gtag('config', '${gaId}', { anonymize_ip: true });
            `}
          </Script>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="lazyOnload" />
        </>
      ) : null}
    </>
  );
}
