import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { LoginLayout } from '@/layouts';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export const getStaticProps = async () => {
  return {
    props: {},
  };
};

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [token, setToken] = useState('');
  const router = useRouter();

  useEffect(() => {
    const resetToken = router.query.token;
    if (resetToken) {
      setToken(resetToken);
    }
  }, [router.query.token]);

  async function onSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (token == '') {
      toast.error('Invalid Link');
      return;
    }
    try {
      const response = await axios.post('/api/auth/reset-password', {
        token,
        newPassword: password,
      });

      if (response.status === 200) {
        toast.success('Password reset successful');
        router.push('/auth/signin');
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.log(error);
      toast.error('Invalid Token. Please Request again');
    }
  }

  return (
    <>
      <div className="flex min-h-screen items-center justify-center px-6 py-10 sm:px-10">
        <div className="flex w-full max-w-md flex-col place-items-center rounded-xl bg-white p-5 shadow-xl">
          <h1 className="my-5 text-center text-xl font-bold leading-6 text-black">
            RESET PASSWORD
          </h1>
          <form onSubmit={onSubmit} className="w-full px-4 py-3">
            <div className="relative">
              <input
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="New Password"
                className="my-2 w-full rounded-sm border border-gray-300 text-sm"
                required
              />
              <div
                className="absolute right-2 top-1/2 -translate-y-1/2 transform cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            <div className="relative ">
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm New Password"
                className="my-2 w-full rounded-sm border border-gray-300 text-sm"
                required
              />
              <div
                className="absolute right-2 top-1/2 -translate-y-1/2 transform cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            <button
              type="submit"
              className="mt-3 w-full rounded-md bg-zinc-900 px-4 py-2 font-medium text-white transition hover:bg-black"
            >
              RESET PASSWORD
            </button>
          </form>
          <div className="mt-5 text-xs text-gray-400">
            <Link href="/auth/signin">
              <span className="underline">Back to Sign In</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

ResetPassword.getLayout = function getLayout(page) {
  return (
    <LoginLayout
      seo={{
        title: 'Reset Password',
        description: 'Reset Password',
        canonical: 'https://yourwebsite.com/auth/resetpassword', // Adjust the URL
      }}
    >
      {page}
    </LoginLayout>
  );
};

export default ResetPassword;
