import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { LoginLayout } from '@/layouts';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export const getStaticProps = async () => {
  return {
    props: {},
  };
};

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const router = useRouter();

  async function onSubmit(e) {
    e.preventDefault();
    try {
      axios
        .post('/api/auth/forgot-password', { email })
        .then((res) => {
          toast.success('Password reset link sent successfully');
          router.push('/auth/signin');
        })
        .catch((err) => {
          const errmsg = err.response.data.error;
          console.log(errmsg);
          toast.error(errmsg);
        });
    } catch (error) {
      console.log(error);
      toast.error('Error sending password reset link');
    }
  }

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center px-6 py-10 sm:px-10">
        <div className="flex w-full max-w-md flex-col place-items-center rounded-xl bg-white p-5 shadow-xl">
          <h1 className="my-5 text-center text-xl font-bold leading-6 text-black">
            FORGOT PASSWORD
          </h1>
          <p className="mb-4 px-6 text-center text-sm font-medium text-gray-400">
            Don&apos;t worry, it happens! Tell us your email address and
            we&apos;ll send you a password reset link.
          </p>
          <form onSubmit={onSubmit}>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Enter your email address"
              className="my-2 w-full rounded-sm border border-gray-300 px-4 py-3 text-sm"
              required
            />
            <button
              type="submit"
              className="mt-3 w-full rounded-md bg-zinc-900 px-4 py-2 font-medium text-white transition hover:bg-black"
            >
              SEND RESET LINK
            </button>
          </form>
          <div className="mt-5 text-xs text-gray-400">
            Remember your password?{' '}
            <Link href="/auth/signin">
              <span className="underline">Sign In</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

ForgotPassword.getLayout = function getLayout(page) {
  return (
    <LoginLayout
      seo={{
        title: 'Forgot Password',
        description: 'Forgot Password',
        canonical: 'https://crypto-derivatives.vercel.app/auth/forgotpassword', // Adjust the URL
      }}
    >
      {page}
    </LoginLayout>
  );
};

export default ForgotPassword;
