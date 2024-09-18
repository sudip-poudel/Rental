"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemCategoryRelation = exports.UserItemsRelation = exports.itemLocationRelation = exports.itemLocation = exports.itemCategoryTableRelations = exports.itemCategory = exports.category = exports.rentalsTableRelations = exports.rentals = exports.itemRelations = exports.item = exports.users = exports.rentalStatus = exports.itemStatus = exports.userRole = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
exports.userRole = (0, pg_core_1.pgEnum)("userRole", ["admin", "user"]);
exports.itemStatus = (0, pg_core_1.pgEnum)("itemStauts", [
    "available",
    "inrent",
    "unavailable",
]);
exports.rentalStatus = (0, pg_core_1.pgEnum)("rentalStatus", [
    "returnRejected",
    "returnAccepted",
    "returnRequested",
    "requestRejected",
    "requestAccepted",
    "returned",
    "rented",
    "requested",
]);
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
    resetPasswordToken: (0, pg_core_1.text)("reset_password_token"),
}, (table) => {
    return {
        emailIndex: (0, pg_core_1.index)("emailIndex").on(table.email),
    };
});
//TODO item rent period is not handled
exports.item = (0, pg_core_1.pgTable)("item", {
    id: (0, pg_core_1.uuid)("id").primaryKey().defaultRandom(),
    title: (0, pg_core_1.varchar)("title", { length: 255 }).notNull(),
    description: (0, pg_core_1.text)("description").notNull(),
    category: (0, pg_core_1.uuid)("category")
        .references(() => exports.category.id, { onDelete: "cascade", onUpdate: "cascade" })
        .notNull(),
    created_at: (0, pg_core_1.timestamp)("created_at").notNull().defaultNow(),
    rate: (0, pg_core_1.real)("rate").notNull(),
    pictureUrl: (0, pg_core_1.text)("picture_url").array().notNull(),
    rentStart: (0, pg_core_1.date)("rent_start", { mode: "date" }).notNull(),
    rentEnd: (0, pg_core_1.date)("rent_end", { mode: "date" }).notNull(),
    initialDeposit: (0, pg_core_1.real)("initial_deposit"),
    itemStatus: (0, exports.itemStatus)("itemStatus").default("available").notNull(),
    addedBy: (0, pg_core_1.uuid)("added_by")
        .notNull()
        .references(() => exports.users.id),
});
exports.itemRelations = (0, drizzle_orm_1.relations)(exports.item, ({ one, many }) => {
    return {
        user: one(exports.users, {
            fields: [exports.item.addedBy],
            references: [exports.users.id],
        }),
        category: one(exports.category, {
            fields: [exports.item.category],
            references: [exports.category.id],
        }),
        rentals: one(exports.rentals),
        location: one(exports.itemLocation),
    };
});
exports.rentals = (0, pg_core_1.pgTable)("rentals", {
    id: (0, pg_core_1.uuid)("id").primaryKey().defaultRandom(),
    item: (0, pg_core_1.uuid)("item_id")
        .notNull()
        .references(() => exports.item.id),
    rentedBy: (0, pg_core_1.uuid)("rented_by")
        .notNull()
        .references(() => exports.users.id),
    rentStart: (0, pg_core_1.date)("rented_at", { mode: "date" }).notNull(),
    rentEnd: (0, pg_core_1.date)("returned_at", { mode: "date" }).notNull(),
    initialDeposit: (0, pg_core_1.real)("initial_deposit").notNull(),
    rate: (0, pg_core_1.real)("rate").notNull(),
    status: (0, exports.rentalStatus)("status").default("requested").notNull(),
    isReturned: (0, pg_core_1.boolean)("is_returned").default(false),
});
exports.rentalsTableRelations = (0, drizzle_orm_1.relations)(exports.rentals, ({ one, many }) => {
    return {
        item: one(exports.item, {
            fields: [exports.rentals.item],
            references: [exports.item.id],
        }),
        rentedBy: one(exports.users, {
            fields: [exports.rentals.rentedBy],
            references: [exports.users.id],
        }),
    };
});
exports.category = (0, pg_core_1.pgTable)("category", {
    id: (0, pg_core_1.uuid)("id").primaryKey().defaultRandom(),
    name: (0, pg_core_1.varchar)("name", { length: 255 }).notNull().unique(),
});
exports.itemCategory = (0, pg_core_1.pgTable)("item_category", {
    id: (0, pg_core_1.uuid)("id").primaryKey().defaultRandom(),
    itemId: (0, pg_core_1.uuid)("item_id")
        .notNull()
        .references(() => exports.item.id),
    categoryId: (0, pg_core_1.uuid)("category_id")
        .notNull()
        .references(() => exports.category.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
    }),
});
exports.itemCategoryTableRelations = (0, drizzle_orm_1.relations)(exports.itemCategory, ({ one, many }) => {
    return {
        item: many(exports.item),
        category: one(exports.category, {
            fields: [exports.itemCategory.categoryId],
            references: [exports.category.id],
        }),
    };
});
exports.itemLocation = (0, pg_core_1.pgTable)("item_location", {
    id: (0, pg_core_1.uuid)("id").primaryKey().defaultRandom(),
    itemId: (0, pg_core_1.uuid)("item_id")
        .notNull()
        .references(() => exports.item.id, { onDelete: "cascade", onUpdate: "cascade" }),
    latitude: (0, pg_core_1.real)("latitude").notNull(),
    longitude: (0, pg_core_1.real)("longitude").notNull(),
    location: (0, pg_core_1.text)("location").notNull(),
});
exports.itemLocationRelation = (0, drizzle_orm_1.relations)(exports.itemLocation, ({ one, many }) => ({
    item: one(exports.item, {
        fields: [exports.itemLocation.itemId],
        references: [exports.item.id],
    }),
}));
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
