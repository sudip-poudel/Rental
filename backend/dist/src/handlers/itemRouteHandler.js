"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRentItem = exports.handleSearch = exports.handleGetCategory = exports.handlePostItem = exports.handleGetItem = void 0;
const db_1 = require("../db");
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../schema/schema");
const handleCloudinaryUpload_1 = require("../helper/handleCloudinaryUpload");
//fetch items from database to show at the homepage
const handleGetItem = async (_, res) => {
    // const itemId = req.params.id;
    try {
        const items = await db_1.db.select().from(schema_1.item);
        return res.json(items);
    }
    catch (error) {
        res.send(error);
        console.log(error);
    }
};
exports.handleGetItem = handleGetItem;
//TODO handle the route to post item data along with picture
const handlePostItem = async (req, res) => {
    const itemData = req.body;
    try {
        if (req.files) {
            const uploadedPhotos = req.files;
            console.log(uploadedPhotos);
            if (uploadedPhotos.length === 0) {
                return res
                    .status(400)
                    .json({ success: false, message: "No image uploaded" });
            }
            let urls = [];
            for (const photo of uploadedPhotos) {
                const b64 = Buffer.from(photo.buffer).toString("base64");
                let dataURI = ("data:" + photo.mimetype) + ";base64," + b64;
                const cldRes = await (0, handleCloudinaryUpload_1.handleItemImageUpload)(dataURI);
                urls.push(cldRes.secure_url);
                console.log(cldRes.secure_url, "test");
            }
            //TODO remove 90 and add initial deposit in the form
            const itemdetails = {
                title: itemData.title,
                description: itemData.description,
                category: itemData.category,
                rate: itemData.rate,
                pictureUrl: urls,
                initialDeposit: itemData.initialDeposit || 90,
                addedBy: req.params.userId,
            };
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
//to get the catagory list from database
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
//to search the item from the item collection with similar keywords in title
const handleSearch = async (req, res) => {
    const search = req.params.search.toLowerCase();
    console.log(search);
    try {
        const searchedItem = await db_1.db
            .select()
            .from(schema_1.item)
            .where((0, drizzle_orm_1.eq)(schema_1.item.title, search));
        return res.json(searchedItem);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Failed to search items" });
    }
};
exports.handleSearch = handleSearch;
const handleRentItem = async (req, res) => {
    const { rentDetails } = req.body;
    const { userId } = req.params;
    const { itemId, startDate, endDate } = rentDetails;
    try {
        const itemData = await db_1.db.select().from(schema_1.item).where((0, drizzle_orm_1.eq)(schema_1.item.id, itemId));
        const itemDetails = itemData[0];
        const rentData = {
            item: itemId,
            rentedBy: userId,
            rentStart: startDate,
            rentEnd: endDate,
            rate: itemDetails.rate,
            initialDeposit: itemDetails.initialDeposit,
        };
        const rentItem = await db_1.db
            .insert(schema_1.rentals)
            .values(rentData)
            .returning({ id: schema_1.item.id });
        await db_1.db
            .update(schema_1.item)
            .set({ itemStatus: "inrent" })
            .where((0, drizzle_orm_1.eq)(schema_1.item.id, itemId));
        return res.status(200).json({ success: true, data: rentItem[0] });
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ success: false, message: "Failed to rent item" });
    }
};
exports.handleRentItem = handleRentItem;
