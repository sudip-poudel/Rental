import { defineConfig } from "drizzle-kit";
import "dotenv/config";
export default defineConfig({
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DRIZZLE_DATABASE_URL as string,
  },
  schema: "./src/schema",
  out: "./drizzle",
});
