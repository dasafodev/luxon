export default async function handler(req, res) {
  const [idCode, resource] = req.query.params;
  switch (resource) {
    case 'matches':
      try {
        const response = await fetch(`https://api.football-data.org/v2/competitions/${idCode}/matches/`, {
          headers: {
            'X-Auth-Token': process.env.FOOTBALL_DATA_API_KEY,
          },
        });
        const data = await response.json();
        return res.status(200).json(data);
      } catch (error) {
        return res.status(400).json({
          statusCode: 400,
          error: error.message,
        });
      }
    case 'standings':
      try {
        const response = await fetch(`https://api.football-data.org/v2/competitions/${idCode}/standings/`, {
          headers: {
            'X-Auth-Token': process.env.FOOTBALL_DATA_API_KEY,
          },
        });
        const data = await response.json();
        return res.status(200).json(data);
      } catch (error) {
        return res.status(400).json({
          statusCode: 400,
          error: error.message,
        });
      }
    case 'scorers':
      try {
        const response = await fetch(`https://api.football-data.org/v2/competitions/${idCode}/scorers/`, {
          headers: {
            'X-Auth-Token': process.env.FOOTBALL_DATA_API_KEY,
          },
        });
        const data = await response.json();
        return res.status(200).json(data);
      } catch (error) {
        return res.status(400).json({
          statusCode: 400,
          error: error.message,
        });
      }
  }
}
