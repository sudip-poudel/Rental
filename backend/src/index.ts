// import express from "express";
const express = require("express");
import { Request, Response } from "express";
const app = express();
const port = 3000;

import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
export const users2 = pgTable("testing", {
  id: serial("id").primaryKey(),
});

import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const queryClient = postgres("postgres://postgres:root@loacalhost:5432/Rent", {
  host: "localhost", // Postgres ip address[s] or domain name[s]
  port: 5432, // Postgres server port[s]
  database: "Rent", // Name of database to connect to
  username: "postgres", // Username of database user
  password: "root", // Password of database user
});
const db = drizzle(queryClient);

const getin = async () => {
  const result = await db.select().from(users2);
  console.log(result);
};

const insert = async () => {
  await db.insert(users2).values({ id: 12 });
};
getin();
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
