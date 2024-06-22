"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const drizzle_kit_1 = require("drizzle-kit");
require("dotenv/config");
exports.default = (0, drizzle_kit_1.defineConfig)({
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DRIZZLE_DATABASE_URL,
    },
    schema: "./src/schema",
    out: "./drizzle",
});
