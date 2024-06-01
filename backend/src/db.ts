import { neon } from "@neondatabase/serverless";
require("dotenv").config();
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema/schema";

const sql = neon(process.env.DRIZZLE_DATABASE_URL as string);

export const db = drizzle(sql, { schema, logger: true });
