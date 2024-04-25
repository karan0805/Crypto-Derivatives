import Link from 'next/link';

const HomeView = () => (
  <main
    style={{
      backgroundImage:
        'linear-gradient(rgb(3, 7, 18) 60%, rgb(6, 41, 79) 100%)',
    }}
    className={`flex h-[90vh] flex-col items-center justify-center gap-10 bg-[#030712] p-24`}
  >
    <div className="flex max-w-7xl flex-col place-items-center gap-10">
      <h2 className=" text-center text-3xl font-bold text-white">
        Implementing Tradingview Lightweight Charts with Bitmex Derivatives Api
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

export default HomeView;
