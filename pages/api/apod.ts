import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let status: number = 500;

  try {
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`,
      { headers: { accept: 'application/json' } }
    );
    const data = await response.json();
    if (!response.ok) {
      status = response.status;
      throw new Error(`Error ${response.status}: ${data?.error?.message}`);
    }
    res.status(200).json(data);
  } catch (error) {
    if (error.type === 'invalid-json') {
      res.status(500).json({ message: error.type });
    } else {
      res.status(status).json({ message: error.message });
    }
  }
};
