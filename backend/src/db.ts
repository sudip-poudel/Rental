import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema/schema";

const sql = neon(process.env.DRIZZLE_DATABASE_URL!);
// console.log(sql, "sql");

export const db = drizzle(sql, { schema, logger: true });

// const result = await db.select().from();
