import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";
import { getServerSession } from "next-auth";

import prismadb from "@/lib/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      const session = await getServerSession(req, res, authOptions);

      const { movieId } = req.body;

      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        },
      });

      if (!existingMovie) {
        throw new Error("Invalid ID");
      }

      const user = await prismadb.user.update({
        where: {
          email: session?.user?.email || "",
        },
        data: {
          FavoriteIds: {
            push: movieId,
          },
        },
      });

      return res.status(201).json(user);
    }

    if (req.method === "DELETE") {
      const session = await getServerSession(req, res, authOptions);

      const { movieId } = req.body;
      const movie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        },
      });
      if (!movie) {
        throw new Error("Invalid ID");
      }

      const currentUser = await prismadb.user.findUnique({
        where: {
          email: session?.user?.email || "",
        },
      });

      const updatedFavoriteIds = without(currentUser?.FavoriteIds, movieId);
      const updateUser = await prismadb.user.update({
        where: {
          email: session?.user?.email || "",
        },
        data: {
          FavoriteIds: updatedFavoriteIds,
        },
      });

      return res.status(201).json(updateUser);
    }

    return res.status(405).end();
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
};

export default handler;
