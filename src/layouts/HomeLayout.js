import { LandingHeader } from '@/components';
import { NextSeo } from 'next-seo';
import { Toaster } from 'react-hot-toast';

export const HomeLayout = ({ seo, children }) => {
  return (
    <>
      <NextSeo noindex={true} nofollow={true} {...seo} />
      <div className="min-h-screen">
        <Toaster />
        <LandingHeader />
        {children}
      </div>
    </>
  );
};
