export default async (req, res) => {
  const { cookies, method, query } = req;

  let status = 401;
  const response = {
    error: { status: true, message: 'Unauthorized' },
    data: null,
  };

  if (cookies.visited) {
    status = 405;
    response.error.message = 'Method not allowed';
    if (method === 'GET') {
      const results = await fetch(
        `https://api.nasa.gov/EPIC/api/natural?api_key=${process.env.NASA_API_KEY}`
      );
      const json = await results.json();
      status = 200;
      response.error = { status: false, message: null };
      response.data = json;
    }
  }

  res.status(status).json(response);
};
