import { NextApiRequest, NextApiResponse } from "next";

import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    await serverAuth(req);

    const { movieId } = req.query;
    if (typeof movieId !== "string" || !movieId) {
      throw new Error("Invalid ID");
    }

    const movie = await prismadb.movie.findUnique({
      where: {
        id: movieId as string,
      },
    });
    if (!movie) {
      throw new Error("Invalid ID");
    }
    return res.status(200).json(movie);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
};

export default handler;
