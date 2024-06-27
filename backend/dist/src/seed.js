"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertCategory = void 0;
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
    const res = await db_1.db.insert(schema_1.category).values(data).returning();
    console.log(res);
};
exports.insertCategory = insertCategory;
