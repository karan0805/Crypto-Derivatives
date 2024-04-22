import Chart from '../chart';

const Dashboard = ({ symbol, setSymbol, symbols }) => {
  return (
    <main className="flex h-[90vh] flex-col gap-5 bg-white px-24 py-12">
      <div className="">
        <label
          htmlFor="symbol"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Choose Symbol
        </label>
        <select
          name="symbol"
          id="symbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          className="rounded bg-gray-200 p-2 pr-20 text-black"
        >
          {symbols.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <h1 className="text-center text-xl font-bold">
        {`${symbol} Chart Using Bitmex Historical & WebSocket API`}
      </h1>

      <Chart symbol={symbol} />
    </main>
  );
};

export default Dashboard;
