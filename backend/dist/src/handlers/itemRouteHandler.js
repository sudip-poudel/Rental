"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGetCategory = exports.handlePostItem = exports.handleGetItem = void 0;
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
            console.log(req.body, "test");
            const itemdetails = {
                title: itemData.title,
                description: itemData.description,
                category: itemData.category,
                rate: itemData.rate,
                pictureUrl: cldRes.secure_url,
                //TODO remove 90 and add initial deposit in the form
                initialDeposit: itemData.initaialDeposite || 90,
                addedBy: req.params.userId,
            };
            console.log(itemdetails);
            //TODO handle category first then handle this
            const newItem = await db_1.db
                .insert(schema_1.item)
                .values(itemdetails)
                .returning({ id: schema_1.item.id });
            const locationInfo = JSON.parse(itemData.pickupLocation);
            const locationData = {
                location: locationInfo.location,
                latitude: locationInfo.latitude,
                longitude: locationInfo.longitude,
                itemId: newItem[0].id,
            };
            console.log(locationData);
            const insertLocation = await db_1.db
                .insert(schema_1.itemLocation)
                .values(locationData)
                .returning({ id: schema_1.itemLocation.itemId });
            console.log(insertLocation);
            return res.json({ success: true, data: newItem });
        }
        return res.json({ success: false, message: "Image not found" });
    }
    catch (error) {
        console.log(error);
    }
};
exports.handlePostItem = handlePostItem;
const handleGetCategory = async (_, res) => {
    try {
        const categories = await db_1.db.select().from(schema_1.category);
        return res.json(categories);
    }
    catch (error) {
        res.send(error);
        console.log(error);
    }
};
exports.handleGetCategory = handleGetCategory;
