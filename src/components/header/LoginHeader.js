import Link from 'next/link';
import { useSession } from 'next-auth/react';

export const LoginHeader = () => {
  const { data: session } = useSession();

  return (
    <header>
      <div className="relative h-[10vh] bg-black">
        <div className="mx-auto flex h-full items-center px-4 xl:container">
          <ul className="ml-auto items-center md:flex">
            {!session && (
              <Link
                rel="noopener noreferrer"
                href="/"
                className="rounded bg-[#FFFFFF] px-8 py-2 font-semibold text-black"
              >
                Back to Home
              </Link>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};
