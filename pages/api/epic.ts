import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, method } = req;

  let type: string = 'natural';
  let url: string = `https://api.nasa.gov/EPIC/api/natural?api_key=${process.env.NASA_API_KEY}`;

  if (!query.date && query.type) {
    if (query.type === 'enhanced') {
      url = `https://api.nasa.gov/EPIC/api/enhanced?api_key=${process.env.NASA_API_KEY}`;
      type = 'enhanced';
    }
  }

  if (query.date) {
    url = `https://api.nasa.gov/EPIC/api/${query.type}/date/${query.date}?api_key=${process.env.NASA_API_KEY}`;
    type = query?.type?.toString();
  }

  switch (method) {
    case 'GET': {
      try {
        if (type !== 'natural' && type !== 'enhanced') {
          res.status(400).json({ message: 'Error 400: Bad Request' });
          break;
        }

        const resp = await fetch(url, {
          headers: { accept: 'application/json' },
        });

        const json = await resp.json();

        if (resp.ok) {
          if (json.length === 0) {
            res
              .status(404)
              .json({ message: 'Error 404: No data for this date.' });
          } else {
            res.status(200).json({ type, items: json });
          }
        } else {
          res
            .status(resp.status)
            .json({ message: `Error ${resp.status}: ${resp.statusText}` });
        }
      } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Oops... Something went wrong' });
      }
      break;
    }
    default:
      res.setHeader('Allow', 'GET');
      res
        .status(405)
        .json({ message: `Error 405: Method ${method} Not Allowed` });
      break;
  }
};
