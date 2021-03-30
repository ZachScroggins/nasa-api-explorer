import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req;

  let status: number = 500;

  if (query.id) {
    let images = null;
    let data = null;
    let error: string = null;
    const imageUrl = query.id
      ? `https://images-api.nasa.gov/asset/${query.id}`
      : `https://images-api.nasa.gov/asset/PIA06907`;
    const dataUrl = query.id
      ? `https://images-api.nasa.gov/search?nasa_id=${query.id}`
      : `https://images-api.nasa.gov/search?nasa_id=PIA06907`;

    try {
      const res = await fetch(dataUrl, {
        headers: { accept: 'application/json' },
      });
      const json = await res.json();
      if (res.ok) {
        status = 200;
        data = json.collection;
      } else {
        status = res.status;
        throw new Error(`Error ${res.status}: ${json?.reason}`);
      }
    } catch (e) {
      console.log(e.message);
      error = e.message;
    }
    try {
      const res = await fetch(imageUrl);
      const json = await res.json();
      if (res.ok) {
        status = 200;
        images = json.collection;
      } else {
        status = res.status;
        throw new Error(`Error ${res.status}: ${json?.reason}`);
      }
    } catch (e) {
      console.log(e.message);
      error = e.message;
    }
    res.status(status).json({ ...data, images, error });
  } else {
    try {
      const response = await fetch(
        `https://images-api.nasa.gov/search?q=${query.q}&media_type=image`
      );
      const data = await response.json();
      if (!response.ok) {
        status = response.status;
        throw new Error(`${data?.reason}`);
      }
      res.status(200).json(data);
    } catch (error) {
      res.status(status).json({ message: error.message });
    }
  }
};
