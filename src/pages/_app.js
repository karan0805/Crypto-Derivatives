import { Inter } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import { DefaultSeo } from 'next-seo';
import NextNProgress from 'nextjs-progressbar';
import '@/styles/globals.css';
import SEO from '../../next-seo.config';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <SessionProvider session={pageProps.session}>
        <main className={`${inter.variable} font-sans`}>
          <DefaultSeo {...SEO} />
          {getLayout(
            <>
              <NextNProgress
                color="#ffffff"
                height={3}
                options={{ showSpinner: false }}
              />
              <Component {...pageProps} />
            </>,
          )}
        </main>
      </SessionProvider>
    </>
  );
}
