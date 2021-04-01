import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, method } = req;

  switch (method) {
    case 'GET': {
      if (!query.id) {
        res.status(400).json({ message: 'Error 400: Bad Request' });
        break;
      }

      let images = null;
      let data = null;

      try {
        const resp = await fetch(
          `https://images-api.nasa.gov/search?nasa_id=${query.id}`,
          {
            headers: { accept: 'application/json' },
          }
        );

        const json = await resp.json();

        if (resp.ok) {
          if (!json.collection.items.length) {
            res.status(404).json({ message: `No results for id: ${query.id}` });
            break;
          } else {
            data = json.collection;
          }
        } else {
          res.status(resp.status).json({
            message: `Error ${resp.status}: ${json?.reason || resp.statusText}`,
          });
          break;
        }
      } catch (error) {
        res.status(500).json({ message: 'Oops... Something went wrong' });
        break;
      }

      try {
        const resp = await fetch(
          `https://images-api.nasa.gov/asset/${query.id}`,
          {
            headers: { accept: 'application/json' },
          }
        );

        const json = await resp.json();

        if (resp.ok) {
          images = json.collection;
        } else {
          res.status(resp.status).json({
            message: `Error ${resp.status}: ${json?.reason || resp.statusText}`,
          });
          break;
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Oops... something went wrong' });
        break;
      }

      res.status(200).json({ ...data, images });

      break;
    }
    default:
      res.setHeader('Allow', 'GET');
      res
        .status(405)
        .json({ message: `Error 405: Method ${method} Not Allowed` });
  }
};
