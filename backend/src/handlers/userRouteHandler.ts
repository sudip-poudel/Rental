import { NextFunction, Request, Response } from "express";
import { db } from "../db";
import { users } from "../schema/schema";
import { eq } from "drizzle-orm";
import { generateToken } from "../helper/generateToken";
const bcrypt = require("bcrypt");

const handleSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    email,
    password,
    name,
  }: { email: string; password: string; name: string } = req.body;
  console.log(email, password, name);
  if (!email || !password) {
    res.status(400).send("Username and password are required");
    return;
  }
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });
    if (user) {
      res.status(400).send("User already exists");
      return;
    }
    const hashedPassword: string = await bcrypt.hash(password, 10);

    const data = await db
      .insert(users)
      .values({ email: email, password: hashedPassword, name: name })
      .returning({ id: users.id });
    const token = generateToken(data[0]);
    res.status(200).cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return;
  } catch (error) {
    next(error);
  }
};

const handleSignin = async (req: Request, res: Response) => {
  const { email, password }: { email: string; password: string } = req.body;
  if (!email || !password) {
    res.status(400).send("Username and password are required");
    return;
  }
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
      columns: {
        id: true,
        email: true,
        name: true,
        password: true,
      },
    });
    if (!user) {
      res.status(400).send("User not found");
      return;
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      res.status(400).send("Invalid password");
      return;
    }
    const token = generateToken({ id: user.id });
    res
      .status(200)
      .send(user)
      .cookie("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
    return;
  } catch (error) {
    console.error(error);
  }
};

export { handleSignup, handleSignin };
