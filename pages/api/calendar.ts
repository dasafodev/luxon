import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method = "POST") {
        try {
            console.log('__dirname', __dirname)
            const file = `${__dirname}/images/logo.png`;
            res.send(file); // Set disposition and send it.
        } catch (e) {
          return res.status(400).json({
            statusCode: 400,
            error: e.message,
          });
        }
    }else{
        return res.status(404).json({
            statusCode: 400,
            error: "Not found",
          });
    }
  };