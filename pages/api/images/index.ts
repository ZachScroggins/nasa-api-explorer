import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, method } = req;

  switch (method) {
    case 'GET': {
      try {
        const response = await fetch(
          `https://images-api.nasa.gov/search?q=${query.q}&media_type=image`,
          { headers: { accept: 'application.json' } }
        );

        if (!response.ok) {
          res.status(response.status).json({
            message: `Error ${response.status}: ${response.statusText}`,
          });
        } else {
          const data = await response.json();
          if (!data.collection.items.length) {
            res
              .status(404)
              .json({ message: `No results for query: ${query.q}` });
          } else {
            res.status(200).json(data);
          }
        }
      } catch (error) {
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
