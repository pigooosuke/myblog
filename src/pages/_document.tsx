import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

export default class Document extends NextDocument {
    render() {
        return (
            <Html>
                <Head>
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}