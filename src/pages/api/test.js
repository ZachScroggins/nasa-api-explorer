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
        `https://images-api.nasa.gov/search?q=${query.query}&media_type=image`
      );
      const json = await results.json();
      status = 200;
      response.error = { status: false, message: null };
      response.data = json;
    }
  }

  res.status(status).json(response);
};
