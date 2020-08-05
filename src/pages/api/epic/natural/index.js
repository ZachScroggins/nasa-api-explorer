export default async (req, res) => {
  const { cookies, method } = req;

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
      if (results?.status !== 200) {
        status = 502;
        response.error.message = 'There was an error fetching data from NASA';
      } else {
        const json = await results.json();
        if (json.length === 0) {
          status = 400;
          response.error.message = 'Sorry, there is no data for this date.';
        } else {
          status = 200;
          // console.log(new Date(json[0].date.slice(0, 10)));
          response.error = { status: false, message: null };
          response.data = json;
        }
      }
    }
  }

  res.status(status).json(response);
};
