"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getcat = exports.insertCategory = void 0;
const db_1 = require("./db");
const schema_1 = require("./schema/schema");
const insertCategory = async () => {
    const data = [
        {
            name: "Vehicles",
        },
        {
            name: "Electronics",
        },
        {
            name: "Home and Garden",
        },
        {
            name: "Professional Equipment",
        },
        {
            name: "Event and Entertainment",
        },
        {
            name: "Specialty Items",
        },
    ];
    const res = await db_1.db.insert(schema_1.category).values({ name: "Others" }).returning();
    console.log(res);
};
exports.insertCategory = insertCategory;
const getcat = async () => {
    const test = await db_1.db.select().from(schema_1.category);
    console.log(test);
};
exports.getcat = getcat;
