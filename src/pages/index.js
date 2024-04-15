import { useState } from 'react';
import { HomeLayout } from '@/layouts';
import { useSession } from 'next-auth/react';
import Dashboard from '@/components/dashboard';
import HomeView from '@/components/homeview';

const Loading = () => (
  <main
    className={`flex h-[90vh] flex-col items-center justify-center gap-10 bg-black p-24`}
  >
    Loading
  </main>
);

const Home = () => {
  const { data: session, status } = useSession();
  const [symbol, setSymbol] = useState('XBTUSD');

  return (
    <>
      {status === 'loading' && <Loading />}
      {session ? (
        <Dashboard symbol={symbol} setSymbol={setSymbol} />
      ) : (
        <HomeView />
      )}
    </>
  );
};

Home.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};

export default Home;
