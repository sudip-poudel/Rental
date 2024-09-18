import { relations, sql } from "drizzle-orm";
import {
  boolean,
  date,
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
export const itemStatus = pgEnum("itemStauts", [
  "available",
  "inrent",
  "unavailable",
]);
export const rentalStatus = pgEnum("rentalStatus", [
  "returnRejected",
  "returnAccepted",
  "returnRequested",
  "requestRejected",
  "requestAccepted",
  "returned",
  "rented",
  "requested",
]);
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
    resetPasswordToken: text("reset_password_token"),
  },
  (table) => {
    return {
      emailIndex: index("emailIndex").on(table.email),
    };
  }
);
//TODO item rent period is not handled
export const item = pgTable("item", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  category: uuid("category")
    .references(() => category.id, { onDelete: "cascade", onUpdate: "cascade" })
    .notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  rate: real("rate").notNull(),
  pictureUrl: text("picture_url").array().notNull(),
  rentStart: date("rent_start", { mode: "date" }).notNull(),
  rentEnd: date("rent_end", { mode: "date" }).notNull(),
  initialDeposit: real("initial_deposit"),
  itemStatus: itemStatus("itemStatus").default("available").notNull(),
  addedBy: uuid("added_by")
    .notNull()
    .references(() => users.id),
});
export const itemRelations = relations(item, ({ one, many }) => {
  return {
    user: one(users, {
      fields: [item.addedBy],
      references: [users.id],
    }),
    category: one(category, {
      fields: [item.category],
      references: [category.id],
    }),
    rentals: one(rentals),
    location: one(itemLocation),
  };
});

export const rentals = pgTable("rentals", {
  id: uuid("id").primaryKey().defaultRandom(),
  item: uuid("item_id")
    .notNull()
    .references(() => item.id),
  rentedBy: uuid("rented_by")
    .notNull()
    .references(() => users.id),
  rentStart: date("rented_at", { mode: "date" }).notNull(),
  rentEnd: date("returned_at", { mode: "date" }).notNull(),
  initialDeposit: real("initial_deposit").notNull(),
  rate: real("rate").notNull(),
  status: rentalStatus("status").default("requested").notNull(),
  isReturned: boolean("is_returned").default(false),
});

export const rentalsTableRelations = relations(rentals, ({ one, many }) => {
  return {
    item: one(item, {
      fields: [rentals.item],
      references: [item.id],
    }),
    rentedBy: one(users, {
      fields: [rentals.rentedBy],
      references: [users.id],
    }),
  };
});

export const category = pgTable("category", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull().unique(),
});

export const itemCategory = pgTable("item_category", {
  id: uuid("id").primaryKey().defaultRandom(),
  itemId: uuid("item_id")
    .notNull()
    .references(() => item.id),
  categoryId: uuid("category_id")
    .notNull()
    .references(() => category.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
});

export const itemCategoryTableRelations = relations(
  itemCategory,
  ({ one, many }) => {
    return {
      item: many(item),
      category: one(category, {
        fields: [itemCategory.categoryId],
        references: [category.id],
      }),
    };
  }
);

export const itemLocation = pgTable("item_location", {
  id: uuid("id").primaryKey().defaultRandom(),
  itemId: uuid("item_id")
    .notNull()
    .references(() => item.id, { onDelete: "cascade", onUpdate: "cascade" }),
  latitude: real("latitude").notNull(),
  longitude: real("longitude").notNull(),
  location: text("location").notNull(),
});
export const itemLocationRelation = relations(
  itemLocation,
  ({ one, many }) => ({
    item: one(item, {
      fields: [itemLocation.itemId],
      references: [item.id],
    }),
  })
);

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
