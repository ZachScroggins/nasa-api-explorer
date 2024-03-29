import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case 'GET': {
      try {
        const response = await fetch(
          `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`,
          { headers: { accept: 'application/json' } }
        );

        const data = await response.json();

        if (!response.ok) {
          res.status(response.status).json({
            message: `Error ${response.status}: ${
              data?.error?.message || response.statusText
            }`,
          });
        } else {
          res.status(200).json(data);
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Oops... Something went wrong' });
      }
      break;
    }
    default:
      res.setHeader('Allow', 'GET');
      res
        .status(405)
        .json({ message: `Error 405: Method ${method} Not Allowed` });
  }
};
