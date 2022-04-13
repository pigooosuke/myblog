import Head from "next/head";

const CommonMeta = ({
  title = "pigooosuke",
  description = "pigooosuke tech blog",
}: {
  title?: string;
  description?: string;
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta property="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicons/favicon-32x32.png"
      />
    </Head>
  );
};

export default CommonMeta;
