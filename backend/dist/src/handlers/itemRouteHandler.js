"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDeleteItem = exports.handleGetRentalDetialsByItemId = exports.handleGetListedItemsByUser = exports.handleRentStatusChange = exports.handleGetRentedItems = exports.handleRentItem = exports.handleSearch = exports.handleGetCategory = exports.handlePostItem = exports.handleGetItemByCategory = exports.handleGetItemById = exports.handleGetItem = void 0;
const db_1 = require("../db");
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../schema/schema");
const handleCloudinaryUpload_1 = require("../helper/handleCloudinaryUpload");
const handleGetItem = async (_, res) => {
    // const itemId = req.params.id;
    try {
        const items = await db_1.db
            .select()
            .from(schema_1.item)
            .innerJoin(schema_1.itemLocation, (0, drizzle_orm_1.eq)(schema_1.item.id, schema_1.itemLocation.itemId))
            .limit(10);
        let itemDetailsWithLocation = [];
        // for (const item of items) {
        //   const locationDetails = (
        //     await db.query.itemLocation.findMany({
        //       where: eq(itemLocation.itemId, item.id),
        //     })
        //   )[0];
        //   const details = { ...item, locationDetails: locationDetails };
        //   itemDetailsWithLocation = [...itemDetailsWithLocation, details];
        // }
        return res.status(200).json({ success: true, data: items });
    }
    catch (error) {
        console.log(error);
        // res.send({ succss: false, message: "Failed to fetch items" });
    }
};
exports.handleGetItem = handleGetItem;
const handleGetItemById = async (req, res) => {
    const itemId = req.params.id;
    try {
        // const itemData = (
        //   await db.select().from(item).where(eq(item.id, itemId))
        // )[0];
        // const locationDetails = (
        //   await db.query.itemLocation.findMany({
        //     where: eq(itemLocation.itemId, itemData.id),
        //   })
        // )[0] as InferSelectModel<typeof itemLocation>;
        // console.log(locationDetails, "locationDetails");
        const itemDetails = (await db_1.db
            .select()
            .from(schema_1.item)
            .innerJoin(schema_1.itemLocation, (0, drizzle_orm_1.eq)(schema_1.item.id, schema_1.itemLocation.itemId))
            .where((0, drizzle_orm_1.eq)(schema_1.item.id, itemId)))[0];
        // const itemDetails = { ...itemData, locationDetails: locationDetails };
        console.log(itemDetails, "itemDetails");
        return res.status(200).json({ success: true, data: itemDetails });
    }
    catch (error) {
        console.log(error);
    }
};
exports.handleGetItemById = handleGetItemById;
const handleGetItemByCategory = async (req, res) => {
    const category = req.params.categoryId;
    console.log(category);
    try {
        const items = await db_1.db.query.item.findMany({
            with: { itemLocation: true },
            where: (0, drizzle_orm_1.eq)(schema_1.item.category, category),
        });
        const locationDetails = await db_1.db.query.itemLocation.findMany({
            where: (0, drizzle_orm_1.eq)(schema_1.itemLocation.itemId, items[0].id),
        });
        console.log(items);
        return res.status(200).json({ success: true, data: items });
    }
    catch (error) {
        console.log(error);
    }
};
exports.handleGetItemByCategory = handleGetItemByCategory;
const handlePostItem = async (req, res) => {
    const itemData = req.body;
    console.log(itemData);
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
            const itemdetails = {
                title: itemData.title,
                description: itemData.description,
                category: itemData.category,
                rate: itemData.rate,
                rentStart: new Date(itemData.rentStart),
                rentEnd: new Date(itemData.rentEnd),
                pictureUrl: urls,
                initialDeposit: itemData.initialDeposit,
                addedBy: req.params.userId,
            };
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
    const search = req.params.search;
    console.log(search);
    try {
        //TODO check the item.id and row.id are incorrect
        const searchedItem = (await db_1.db.execute((0, drizzle_orm_1.sql) `select * from item 
        inner join item_location on item.id = item_location.item_id
        where to_tsvector(description || ' ' || title) @@ to_tsquery(${search})`)).rows.map((row) => {
            console.log(row);
            const itemRes = {
                item: {
                    id: row.item_id,
                    title: row.title,
                    description: row.description,
                    category: row.category,
                    itemStatus: row.itemStatus,
                    rate: row.rate,
                    rentStart: row.rent_start,
                    rentEnd: row.rent_end,
                    pictureUrl: row.picture_url,
                    initialDeposit: row.initial_deposit,
                    addedBy: row.added_by,
                },
                item_location: {
                    location: row.location,
                    latitude: row.latitude,
                    longitude: row.longitude,
                },
            };
            return itemRes;
        });
        console.log(searchedItem);
        return res.json({ success: true, data: searchedItem });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Failed to search items" });
    }
};
exports.handleSearch = handleSearch;
const handleRentItem = async (req, res) => {
    const rentDetails = req.body;
    const { userId } = req.params;
    console.log(rentDetails);
    const { item: itemId, rentStart, rentEnd } = rentDetails;
    try {
        const itemData = await db_1.db.select().from(schema_1.item).where((0, drizzle_orm_1.eq)(schema_1.item.id, itemId));
        const itemDetails = itemData[0];
        const rentData = {
            item: itemId,
            rentedBy: userId,
            rentStart: new Date(rentStart),
            rentEnd: new Date(rentEnd),
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
        return res.status(200).json({ success: true, data: "Rented successfully" });
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ success: false, data: "Failed to rent item" });
    }
};
exports.handleRentItem = handleRentItem;
const handleGetRentedItems = async (req, res) => {
    const { user } = req.params;
    console.log(user, req.params);
    try {
        const rentedItems = await db_1.db
            .select()
            .from(schema_1.rentals)
            .where((0, drizzle_orm_1.eq)(schema_1.rentals.rentedBy, user));
        return res.status(200).json({ success: true, data: rentedItems });
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ success: false, data: "Failed to fetch rented items" });
    }
};
exports.handleGetRentedItems = handleGetRentedItems;
const handleRentStatusChange = async (req, res) => {
    const { rentId, rentStatus } = req.body;
    try {
        if (rentStatus === "returnAccepted") {
            const rentData = await db_1.db
                .select()
                .from(schema_1.rentals)
                .where((0, drizzle_orm_1.eq)(schema_1.rentals.id, rentId));
            const rentDetails = rentData[0];
            const itemId = rentDetails.item;
            await db_1.db.delete(schema_1.rentals).where((0, drizzle_orm_1.eq)(schema_1.rentals.id, rentId));
            await db_1.db
                .update(schema_1.item)
                .set({ itemStatus: "available" })
                .where((0, drizzle_orm_1.eq)(schema_1.item.id, itemId));
            return;
        }
        await db_1.db
            .update(schema_1.rentals)
            .set({ status: rentStatus })
            .where((0, drizzle_orm_1.eq)(schema_1.rentals.id, rentId));
        return res
            .status(200)
            .json({ success: true, data: `Status changed to ${rentStatus}` });
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ success: false, data: "Failed to change status" });
    }
};
exports.handleRentStatusChange = handleRentStatusChange;
const handleGetListedItemsByUser = async (req, res) => {
    const { user } = req.params;
    try {
        const listedItems = await db_1.db
            .select()
            .from(schema_1.item)
            .innerJoin(schema_1.itemLocation, (0, drizzle_orm_1.eq)(schema_1.item.id, schema_1.itemLocation.itemId))
            .where((0, drizzle_orm_1.eq)(schema_1.item.addedBy, user));
        return res.status(200).json({ success: true, data: listedItems });
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ success: false, data: "Failed to fetch listed items" });
    }
};
exports.handleGetListedItemsByUser = handleGetListedItemsByUser;
const handleGetRentalDetialsByItemId = async (req, res) => {
    //TODO make this route and use in dashboard listing\
    const { itemid } = req.params;
    try {
        const rentaldetails = (await db_1.db.select().from(schema_1.rentals).where((0, drizzle_orm_1.eq)(schema_1.rentals.item, itemid)))[0];
        return res.status(200).json({ success: true, data: rentaldetails });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, data: "Failed to execute " });
    }
};
exports.handleGetRentalDetialsByItemId = handleGetRentalDetialsByItemId;
const handleDeleteItem = async (req, res) => {
    const { itemId } = req.params;
    try {
        const itemData = await db_1.db.select().from(schema_1.item).where((0, drizzle_orm_1.eq)(schema_1.item.id, itemId));
        const itemDetails = itemData[0];
        console.log(itemId, itemDetails);
        if (itemDetails.itemStatus === "inrent") {
            return res
                .status(400)
                .json({ success: false, data: "Cannot delete rented item" });
        }
        await db_1.db.delete(schema_1.item).where((0, drizzle_orm_1.eq)(schema_1.item.id, itemId));
        return res.status(200).json({ success: true, data: "Item deleted" });
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ success: false, data: "Failed to delete item" });
    }
};
exports.handleDeleteItem = handleDeleteItem;
