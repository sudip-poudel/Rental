import { NextFunction, Request, Response } from "express";
import { db } from "../db";
import { users } from "../schema/schema";
import { eq } from "drizzle-orm";
import { generateToken } from "../helper/generateToken";
const bcrypt = require("bcrypt");

const handleSignup = async (req: Request, res: Response) => {
  const {
    email,
    password,
    name,
  }: { email: string; password: string; name: string } = req.body;
  console.log(email, password, name);
  if (!email || !password) {
    return res.status(400).send("Username and password are required");
  }
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });
    if (user) {
      return res.status(400).send("User already exists");
    }
    const hashedPassword: string = await bcrypt.hash(password, 10);

    const data = await db
      .insert(users)
      .values({ email: email, password: hashedPassword, name: name })
      .returning({ id: users.id, name: users.name, email: users.email });
    const id = { id: data[0].id };
    const userData = {
      id: data[0].id,
      name: data[0].name,
      email: data[0].email,
    };
    const token = generateToken(id);
    const stringifiedData = JSON.stringify(userData);
    console.log(stringifiedData);
    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.cookie("userdata", stringifiedData, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).send("Signup successful");
    return;
  } catch (error) {
    return res.send("Internal server error");
  }
};

const handleLogin = async (req: Request, res: Response) => {
  const { email, password }: { email: string; password: string } = req.body;
  console.log(req.body);

  if (!email || !password) {
    return res.status(400).send("Username and password are required");
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
      return res.status(400).send("User not found");
    }
    const isValid: boolean = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).send("Invalid password");
    }
    const token = generateToken({ id: user.id });
    const stringifiedUserData = JSON.stringify({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.cookie("userdata", stringifiedUserData, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).send("Login successful");
  } catch (error) {
    console.error(error);
  }
};

const handleLogout = async (req: Request, res: Response) => {
  res.clearCookie("token");
  res.clearCookie("userdata");
  res.status(200).send("Logged out successfully");
};

export { handleSignup, handleLogin, handleLogout };
