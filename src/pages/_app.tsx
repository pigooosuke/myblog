import type { AppPropsWithLayout } from "next/app";
import Head from "next/head";
import "@/styles/globals.css";
import { usePageView } from "@/hooks/usePageView";
import { GA_ID } from "@/lib/gtag";

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  usePageView();
  return getLayout(
    <>
      <Head>
        <title>pigooosuke</title>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicons/favicon-32x32.png"
        />

        {GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                   window.dataLayer = window.dataLayer || [];
                   function gtag(){dataLayer.push(arguments);}
                   gtag('js', new Date());
                   gtag('config', '${GA_ID}', {
                     page_path: window.location.pathname,
                   });`,
              }}
            />
          </>
        )}
      </Head>
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
