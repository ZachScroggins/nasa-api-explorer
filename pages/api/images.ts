import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req;

  try {
    const resp = await fetch(
      `https://images-api.nasa.gov/search?q=${query.q}&media_type=image`
    );
    if (!resp.ok) {
      throw new Error(`Error ${resp.status}`);
    }
    const data = await resp.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};
