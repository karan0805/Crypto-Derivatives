import React, { useEffect, useRef } from 'react';
import { CrosshairMode, createChart } from 'lightweight-charts';

async function fetchHistoricalData(symbol, count, binSize) {
  const endpoint = `/api/proxy`;
  const params = new URLSearchParams({
    binSize: binSize,
    partial: false,
    symbol: symbol,
    count: count,
    reverse: true,
  });

  const response = await fetch(`${endpoint}?${params.toString()}`);
  if (!response.ok) {
    throw new Error('Failed to fetch historical data');
  }
  const data = await response.json();

  try {
    const parsedData = data.map((d) => ({
      time: parseFloat(new Date(d.timestamp).getTime() / 1000),
      open: parseFloat(d.open),
      high: parseFloat(d.high),
      low: parseFloat(d.low),
      close: parseFloat(d.close),
    }));
    parsedData.sort((a, b) => a.time - b.time);
    return parsedData;
  } catch (error) {
    console.error('Error processing data:', error);
    throw new Error('Failed to process historical data');
  }
}

const Dashboard = () => {
  const chartContainerRef = useRef();
  const chart = useRef();
  const resizeObserver = useRef();
  const ws = useRef(null);

  useEffect(() => {
    console.log('Dashboard component mounted');
    return () => {
      console.log('Dashboard component unmounted');
    };
  }, []);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chartOptions = {
      width: chartContainerRef.current.clientWidth,
      height: 500,
      layout: {
        background: { type: 'solid', color: '#253248' },
        textColor: 'rgba(255, 255, 255, 0.9)',
      },
      grid: {
        vertLines: {
          color: '#334158',
        },
        horzLines: {
          color: '#334158',
        },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      priceScale: {
        borderColor: '#485c7b',
      },
      timeScale: {
        borderColor: '#485c7b',
        timeVisible: true,
        secondsVisible: false,
        rightOffset: 100,
      },
    };
    const candleOptions = {
      upColor: '#4bffb5',
      downColor: '#ff4976',
      borderDownColor: '#ff4976',
      borderUpColor: '#4bffb5',
      wickDownColor: '#838ca1',
      wickUpColor: '#838ca1',
    };

    chart.current = createChart(chartContainerRef.current, chartOptions);
    const candleSeries = chart.current.addCandlestickSeries(candleOptions);

    fetchHistoricalData('XBTUSD', 200, '1m')
      .then((data) => {
        const historicalCandles = data.map((d) => ({
          time: d.time,
          open: d.open,
          high: d.high,
          low: d.low,
          close: d.close,
        }));
        candleSeries.setData(historicalCandles);
        console.log('Historical Data Loaded');
      })
      .catch((error) =>
        console.error('Error fetching historical data:', error),
      );

    ws.current = new WebSocket(
      'wss://www.bitmex.com/realtime?subscribe=tradeBin1m:XBTUSD',
    );

    ws.current.onopen = () => {
      console.log('WebSocket connected successfully.');
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data && data.data) {
        const bars = data.data.map((bar) => ({
          time: Math.floor(new Date(bar.timestamp).getTime() / 1000),
          open: bar.open,
          high: bar.high,
          low: bar.low,
          close: bar.close,
        }));
        console.log('New Candle Received From Socket', bars[0]);

        if (bars.length) {
          candleSeries.update(bars[0]);
        }
      }
    };

    return () => {
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.close();
        console.log('WebSocket connection closed from cleanup');
      }
      if (chart.current) {
        chart.current.remove();
        chart.current = null;
      }
    };
  }, []);

  useEffect(() => {
    resizeObserver.current = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      chart.current.applyOptions({ width, height });
      setTimeout(() => {
        chart.current.timeScale().fitContent();
      }, 0);
    });

    resizeObserver.current.observe(chartContainerRef.current);

    return () => {
      resizeObserver.current.disconnect();
    };
  }, []);

  return <div ref={chartContainerRef} style={{ flex: 1 }} />;
};

export default Dashboard;
