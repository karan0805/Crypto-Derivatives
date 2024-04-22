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

export async function getServerSideProps() {
  try {
    const res = await fetch('https://www.bitmex.com/api/v1/instrument/active');
    const data = await res.json();
    const symbols = data.map((item) => item.symbol);
    return {
      props: {
        symbols,
      },
    };
  } catch (error) {
    console.error('Failed to fetch symbols:', error);
    return {
      props: {
        symbols: ['XRPUSDT', 'BNBUSDT', 'BCHUSD'],
      },
    };
  }
}

const Home = ({ symbols }) => {
  const { data: session, status } = useSession();
  const [symbol, setSymbol] = useState('XBTUSD');

  return (
    <>
      {status === 'loading' && <Loading />}
      {session ? (
        <Dashboard symbol={symbol} setSymbol={setSymbol} symbols={symbols} />
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
