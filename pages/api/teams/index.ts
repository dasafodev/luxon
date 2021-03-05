import type { NextApiRequest, NextApiResponse } from "next";

import db from "../../../utils/database";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const teamsRef = db.collection("teams");
    const snapshot = await teamsRef.get();

    const teams = [];

    snapshot.forEach((doc) => {
      teams.push(doc.data());
    });

    res.status(200).json({
      statusCode: 200,
      teams: teams,
    });
  } catch (e) {
    res.status(400).json({
      statusCode: 400,
      message: e.message,
    });
  }
};
