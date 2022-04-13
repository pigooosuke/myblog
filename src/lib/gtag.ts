export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

// https://developers.google.com/analytics/devguides/migration/measurement/virtual-pageviews
export const pageview = (title: string, url: string) => {
  if (!GA_ID) return;
  window.gtag("config", GA_ID, {
    page_title: title,
    page_location: url,
  });
};

// https://developers.google.com/gtagjs/reference/ga4-events
export const share = (method: string, contentType: string, itemId?: string) => {
  if (!GA_ID) {
    return;
  }

  window.gtag("event", "share", {
    method: method,
    content_type: contentType,
    item_id: itemId,
  });
};
