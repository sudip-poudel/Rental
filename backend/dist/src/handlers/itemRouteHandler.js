"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePostItem = exports.handleGetItem = void 0;
const db_1 = require("../db");
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../schema/schema");
const handleGetItem = async (req, res) => {
    const itemId = req.params.id;
    const itemData = await db_1.db.query.item.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.item.id, itemId),
    });
};
exports.handleGetItem = handleGetItem;
//TODO handle the route to post item data along with picture
const handlePostItem = async (req, res) => {
    const itemData = req.body;
    res.json(itemData);
};
exports.handlePostItem = handlePostItem;
