import type { AppPropsWithLayout } from "next/app";
import "@/styles/globals.css";
import { useEffect } from "react";
import { pageview } from "@/lib/gtag";
import GoogleAnalytics from "@/components/script/googleAnalytics";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (location.host !== "localhost") {
        pageview(pageProps.title, url);
      }
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events, pageProps.title]);
  return getLayout(
    <>
      <GoogleAnalytics />
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
