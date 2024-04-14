import { Head, Html, Main, NextScript } from 'next/document';
import { Favicon } from '@/components/_document/favicon';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <Favicon />
        {process.env.NODE_ENV === 'production' ? (
          <>
            {/* eslint-disable-next-line @next/next/next-script-for-ga */}
            <script async src="/clarity.js" />
          </>
        ) : null}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
