import type { NextApiRequest, NextApiResponse } from "next";

import db from "../../../utils/database";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const teamsRef = db.collection("teams");
    const response = await teamsRef.doc(`${req.query.id}`).get();
    const team = await response.data();

    if (team === undefined) {
      throw new Error("The team was not found.");
    }

    res.status(200).json({
      statusCode: 200,
      team: team,
    });
  } catch (e) {
    res.status(400).json({
      statusCode: 400,
      message: e.message,
    });
  }
};
