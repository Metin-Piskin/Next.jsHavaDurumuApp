import type { NextApiRequest, NextApiResponse } from "next";

import Iller from "../../../../Iller.json";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    res.status(200).json(Iller);
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
