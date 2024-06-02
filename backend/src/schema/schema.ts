import {
  index,
  pgEnum,
  pgTable,
  real,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const userRole = pgEnum("userRole", ["admin", "user"]);

export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password: text("password").notNull(),
    created_at: timestamp("created_at").notNull().defaultNow(),
    rating: real("rating").notNull().default(0.0),
    role: userRole("userRole").default("user"),
  },
  (table) => {
    return {
      emailIndex: index("emainIndex").on(table.email),
    };
  }
);
