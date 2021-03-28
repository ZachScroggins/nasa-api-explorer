import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let status = 500;

  const { query } = req;
  let items = null;
  let error = null;
  let type = 'natural';
  let url = `https://api.nasa.gov/EPIC/api/natural?api_key=${process.env.NASA_API_KEY}`;
  if (!query.date && query.type) {
    if (query.type === 'enhanced') {
      url = `https://api.nasa.gov/EPIC/api/enhanced?api_key=${process.env.NASA_API_KEY}`;
      type = 'enhanced';
    }
  }
  if (query.date) {
    url = `https://api.nasa.gov/EPIC/api/${query.type}/date/${query.date}?api_key=${process.env.NASA_API_KEY}`;
    type = query.type.toString();
  }

  try {
    const resp = await fetch(url);
    const json = await resp.json();
    if (resp.ok) {
      status = 200;
      items = json;
      if (json.length === 0) {
        status = 404;
        items = null;
        throw new Error('Error 404: No data for this date.');
      }
    } else {
      status = resp.status;
      throw new Error(`Error ${resp.status}: ${json?.reason}`);
    }
  } catch (e) {
    console.log(e.message);
    error = e.message;
  }

  res.status(status).json({ items, type, error });
};