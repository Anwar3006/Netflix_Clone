import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

import prismadb from "@/lib/prismadb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res.status(400).json({ message: "Missing username, email or password" });
    }

    //check if user already exists
    const userExists = await prismadb.user.findUnique({
      where: {
        email,
      },
    });
    if (userExists) {
      res.status(409).json({ error: "Email already in use" });
    }

    //hash the password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 12);

    //store new user
    const new_user = await prismadb.user.create({
      data: {
        email,
        name: username,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });

    return res.status(201).json(new_user);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
};

export default handler;
