export default async function handler(req, res) {
  const url = `https://www.bitmex.com/api/v1/trade/bucketed?${req.url.split('?')[1]}`;

  try {
    const bitmexResponse = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await bitmexResponse.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Failed to fetch data from BitMEX', error);
    res.status(500).json({ message: 'Failed to fetch data' });
  }
}
