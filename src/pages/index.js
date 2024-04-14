import Link from 'next/link';
import { HomeLayout } from '@/layouts';
import { useSession } from 'next-auth/react';
import Dashboard from '@/components/dashboard';

const Home = () => {
  const { data: session, status } = useSession();
  let nodeToRender;

  if (status === 'loading') {
    nodeToRender = (
      <main
        className={`flex h-[90vh] flex-col items-center justify-center gap-10 bg-black p-24`}
      >
        Loading
      </main>
    );
  } else if (session) {
    nodeToRender = (
      <main className={`flex h-[90vh] flex-col  gap-10 bg-white p-24`}>
        <h1 className="text-center text-xl font-bold">
          XBTUSD Chart Using Bitmez Historical & WebSocket Api
        </h1>
        <Dashboard />
      </main>
    );
  } else {
    nodeToRender = (
      <main
        className={`flex h-[90vh] flex-col items-center justify-center gap-10 bg-black p-24`}
      >
        <div className="flex flex-col place-items-center gap-5">
          <h2 className="text-bold text-2xl text-white">
            GreeX Assignment Submission by Karan
          </h2>
          <Link
            rel="noopener noreferrer"
            href="/auth/signup"
            className="rounded bg-[#FFFFFF] px-8 py-3 font-semibold text-black"
          >
            Click here to login
          </Link>
        </div>
      </main>
    );
  }

  return <>{nodeToRender}</>;
};

Home.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};

export default Home;
