import type { NextApiRequest, NextApiResponse } from 'next';
import { DateTime } from 'luxon';
import { firestore } from 'firebase-admin';

import db from '../../utils/database';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      try {
        const matchesRef = db.collection('matches');
        const teamsRef = db.collection('teams');

        const tempMatches = [];
        const matches = [];

        const date = DateTime.now().c;

        const dateFrom = firestore.Timestamp.fromDate(
          new Date(
            `${date.year}-${date.month < 9 ? `0${date.month}` : date.month}-${
              date.day < 9 ? `0${date.day}` : date.day
            }`,
          ),
        );

        const snapshot = await matchesRef.where('timestamp', '>=', dateFrom).limit(20).get();

        snapshot.forEach((doc) => {
          tempMatches.push(doc.data());
        });

        await Promise.all(
          tempMatches.map(async (match) => {
            const homeTeamDoc = await teamsRef.doc(`${match.homeTeam.id}`).get();
            const homeTeamData = homeTeamDoc.data();
            const awayTeamDoc = await teamsRef.doc(`${match.awayTeam.id}`).get();
            const awayTeamData = awayTeamDoc.data();
            matches.push({
              ...match,
              homeTeam: homeTeamData,
              awayTeam: awayTeamData,
            });
          }),
        );

        return res.status(200).json({
          statusCode: 200,
          total: matches.length,
          matches: matches,
        });
      } catch (e) {
        return res.status(400).json({
          statusCode: 400,
          error: e.message,
        });
      }
    case 'POST':
      try {
        // List matches across (a set of) competitions.
        // Oficial information: www.football-data.org/documentation/api#match
        const dateFrom = DateTime.now().c;
        const dateTo = DateTime.now().plus({ day: 10 }).c;

        const response = await fetch(
          `http://api.football-data.org/v2/matches?dateFrom=${dateFrom.year}-${
            dateFrom.month < 9 ? `0${dateFrom.month}` : dateFrom.month
          }-${dateFrom.day < 9 ? `0${dateFrom.day}` : dateFrom.day}&dateTo=${dateTo.year}-${
            dateTo.month < 9 ? `0${dateTo.month}` : dateTo.month
          }-${dateTo.day < 9 ? `0${dateTo.day}` : dateTo.day}`,
          {
            headers: {
              'X-Auth-Token': process.env.FOOTBALL_DATA_API_KEY,
            },
          },
        );

        const data = await response.json();

        data.matches.forEach(async (match) => {
          const date = new Date(match.utcDate);
          await db
            .collection('matches')
            .doc(`${match.id}`)
            .update({
              ...match,
              utcDate: match.utcDate,
              timestamp: firestore.Timestamp.fromDate(date),
            });
        });

        return res.status(201).json({
          statusCode: 201,
          message: "Today's matches have been saved.",
        });
      } catch (e) {
        return res.status(400).json({
          statusCode: 400,
          error: e.message,
        });
      }
  }
};
