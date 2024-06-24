"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePostItem = exports.handleGetItem = void 0;
const db_1 = require("../db");
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../schema/schema");
const handleCloudinaryUpload_1 = require("../helper/handleCloudinaryUpload");
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
    try {
        if (req.file) {
            const b64 = Buffer.from(req.file?.buffer).toString("base64");
            let dataURI = ("data:" + req?.file.mimetype) + ";base64," + b64;
            const cldRes = await (0, handleCloudinaryUpload_1.handleItemImageUpload)(dataURI);
            console.log(cldRes);
            const itemdetails = { ...itemData, image: cldRes.public_id };
            console.log(itemdetails);
            //TODO handle category first then handle this
            // const newItem = await db
            //   .insert(item)
            //   .values(itemdetails)
            //   .returning({ id: item.id });
            // return res.json({ success: true, data: newItem });
        }
        return res.json({ success: false, message: "Image not found" });
    }
    catch (error) {
        console.log(error);
    }
};
exports.handlePostItem = handlePostItem;
