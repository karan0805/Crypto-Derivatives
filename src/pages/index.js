import { useState } from 'react';
import { HomeLayout } from '@/layouts';
import { useSession } from 'next-auth/react';
import Dashboard from '@/components/dashboard';
import HomeView from '@/components/homeview';

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
  const { data: session } = useSession();
  const [symbol, setSymbol] = useState('XBTUSD');

  return (
    <>
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
