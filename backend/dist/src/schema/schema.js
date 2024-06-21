"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemCategoryRelation = exports.UserItemsRelation = exports.itemLocation = exports.itemCategory = exports.category = exports.rentals = exports.item = exports.users = exports.userRole = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
exports.userRole = (0, pg_core_1.pgEnum)("userRole", ["admin", "user"]);
exports.users = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.uuid)("id").primaryKey().defaultRandom(),
    name: (0, pg_core_1.varchar)("name", { length: 255 }).notNull(),
    email: (0, pg_core_1.varchar)("email", { length: 255 }).notNull().unique(),
    password: (0, pg_core_1.text)("password"),
    created_at: (0, pg_core_1.timestamp)("created_at").notNull().defaultNow(),
    rating: (0, pg_core_1.real)("rating").notNull().default(0.0),
    role: (0, exports.userRole)("user_role").default("user"),
    profileUrl: (0, pg_core_1.text)("profile_url").default(""),
    totalGivenRent: (0, pg_core_1.real)("total_given_rent").default(0),
    totalTakenRent: (0, pg_core_1.real)("total_taken_rent").default(0),
}, (table) => {
    return {
        emailIndex: (0, pg_core_1.index)("emailIndex").on(table.email),
    };
});
exports.item = (0, pg_core_1.pgTable)("item", {
    id: (0, pg_core_1.uuid)("id").primaryKey().defaultRandom(),
    title: (0, pg_core_1.varchar)("title", { length: 255 }).notNull(),
    description: (0, pg_core_1.text)("description").notNull(),
    category: (0, pg_core_1.varchar)("category", { length: 255 }).notNull(),
    created_at: (0, pg_core_1.timestamp)("created_at").notNull().defaultNow(),
    rate: (0, pg_core_1.real)("rate").notNull(),
    pictureUrl: (0, pg_core_1.text)("picture_url").notNull(),
    addedBy: (0, pg_core_1.uuid)("added_by")
        .notNull()
        .references(() => exports.users.id),
});
exports.rentals = (0, pg_core_1.pgTable)("rentals", {
    id: (0, pg_core_1.uuid)("id").primaryKey().defaultRandom(),
    item: (0, pg_core_1.uuid)("item_id")
        .notNull()
        .references(() => exports.item.id),
    rentedBy: (0, pg_core_1.uuid)("rented_by")
        .notNull()
        .references(() => exports.users.id),
    rentStart: (0, pg_core_1.timestamp)("rented_at").notNull().defaultNow(),
    rentEnd: (0, pg_core_1.timestamp)("returned_at"),
    isReturned: (0, pg_core_1.boolean)("is_returned").default(false),
});
exports.category = (0, pg_core_1.pgTable)("category", {
    id: (0, pg_core_1.uuid)("id").primaryKey().defaultRandom(),
    name: (0, pg_core_1.varchar)("name", { length: 255 }).notNull(),
});
exports.itemCategory = (0, pg_core_1.pgTable)("item_category", {
    itemId: (0, pg_core_1.uuid)("item_id")
        .notNull()
        .references(() => exports.item.id),
    categoryId: (0, pg_core_1.uuid)("category_id")
        .notNull()
        .references(() => exports.category.id),
});
exports.itemLocation = (0, pg_core_1.pgTable)("item_location", {
    itemId: (0, pg_core_1.uuid)("item_id")
        .notNull()
        .references(() => exports.item.id),
    latitude: (0, pg_core_1.real)("latitude").notNull(),
    longitude: (0, pg_core_1.real)("longitude").notNull(),
});
exports.UserItemsRelation = (0, drizzle_orm_1.relations)(exports.users, ({ one, many }) => {
    return {
        items: many(exports.item),
        rentals: many(exports.rentals),
    };
});
exports.ItemCategoryRelation = (0, drizzle_orm_1.relations)(exports.item, ({ one, many }) => {
    return {
        categories: many(exports.category),
    };
});
