import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let status = 500;

  try {
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`
    );
    const data = await response.json();
    if (!response.ok) {
      status = response.status;
      throw new Error(`Error ${response.status}: ${data?.error?.message}`);
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(status).json({ message: error.message });
  }
};
