import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { LoginHeader } from '@/components';
import { useSession } from 'next-auth/react';
import { NextSeo } from 'next-seo';
import { Toaster } from 'react-hot-toast';

export const LoginLayout = ({ seo, children }) => {
  const router = useRouter();
  const { status } = useSession();
  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [router, status]);

  return (
    <>
      <NextSeo noindex={true} nofollow={true} {...seo} />
      <div className="min-h-screen">
        <Toaster />
        <LoginHeader />
        {children}
      </div>
    </>
  );
};
