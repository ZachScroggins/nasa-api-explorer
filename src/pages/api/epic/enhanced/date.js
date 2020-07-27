export default async (req, res) => {
  const { cookies, method, query } = req;
  const validDate = /^(2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/;

  let status = 401;
  const response = {
    error: { status: true, message: 'Unauthorized' },
    data: null,
  };

  if (cookies.visited) {
    status = 405;
    response.error.message = 'Method not allowed';
    if (method === 'GET') {
      if (!query.q || !validDate.test(query.q)) {
        status = 400;
        response.error.message =
          "Invalid query. Expected query in form of: 'q=yyyy-MM-dd'";
      } else {
        const results = await fetch(
          `https://api.nasa.gov/EPIC/api/enhanced/date/${query?.q}?api_key=${process.env.NASA_API_KEY}`
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
            response.error = { status: false, message: null };
            response.data = json;
          }
        }
      }
    }
  }

  res.status(status).json(response);
};
