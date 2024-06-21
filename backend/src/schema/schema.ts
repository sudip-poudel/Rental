import { relations, sql } from "drizzle-orm";
import {
  boolean,
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
    password: text("password"),
    created_at: timestamp("created_at").notNull().defaultNow(),
    rating: real("rating").notNull().default(0.0),
    role: userRole("user_role").default("user"),
    profileUrl: text("profile_url").default(""),
    totalGivenRent: real("total_given_rent").default(0),
    totalTakenRent: real("total_taken_rent").default(0),
  },
  (table) => {
    return {
      emailIndex: index("emailIndex").on(table.email),
    };
  }
);
export const item = pgTable("item", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  category: varchar("category", { length: 255 }).notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  rate: real("rate").notNull(),
  pictureUrl: text("picture_url").notNull(),
  addedBy: uuid("added_by")
    .notNull()
    .references(() => users.id),
});

export const rentals = pgTable("rentals", {
  id: uuid("id").primaryKey().defaultRandom(),
  item: uuid("item_id")
    .notNull()
    .references(() => item.id),
  rentedBy: uuid("rented_by")
    .notNull()
    .references(() => users.id),
  rentStart: timestamp("rented_at").notNull().defaultNow(),
  rentEnd: timestamp("returned_at"),
  isReturned: boolean("is_returned").default(false),
});

export const category = pgTable("category", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
});

export const itemCategory = pgTable("item_category", {
  itemId: uuid("item_id")
    .notNull()
    .references(() => item.id),
  categoryId: uuid("category_id")
    .notNull()
    .references(() => category.id),
});
export const itemLocation = pgTable("item_location", {
  itemId: uuid("item_id")
    .notNull()
    .references(() => item.id),
  latitude: real("latitude").notNull(),
  longitude: real("longitude").notNull(),
});

export const UserItemsRelation = relations(users, ({ one, many }) => {
  return {
    items: many(item),
    rentals: many(rentals),
  };
});
export const ItemCategoryRelation = relations(item, ({ one, many }) => {
  return {
    categories: many(category),
  };
});
