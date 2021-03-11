import type { NextApiRequest, NextApiResponse } from 'next';
import moment from 'moment';
import ical from 'ical-generator';

const cal = ical({
  domain: 'luxxon.vercel.com',
  prodId: { company: 'luxxoncorp.com', product: 'ical-generator' },
  name: 'Luxxon Calendar',
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == 'POST') {
    try {
      const startHour = req.body['start'];
      const title = req.body['title'];
      cal.createEvent({
        start: moment(startHour),
        end: moment(startHour).add(2, 'hour'),
        summary: title,
        organizer: "Organizer's LuxonCorp <luxxoncorp@luxxon.com>",
      });
      cal.serve(res);
    } catch (e) {
      return res.status(400).json({
        statusCode: 400,
        error: e.message,
      });
    }
  } else {
    return res.status(404).json({
      statusCode: 400,
      error: 'Not found',
    });
  }
};
