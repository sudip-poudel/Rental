import { Request, Response } from "express";
import { db } from "../db";
import { InferSelectModel, eq, sql } from "drizzle-orm";
import { category, item, itemLocation, rentals } from "../schema/schema";
import { handleItemImageUpload } from "../helper/handleCloudinaryUpload";
import { UploadApiResponse } from "cloudinary";
import { IItem, IItemRes } from "../types/types";

//fetch items from database to show at the homepage
type ItemDetails = InferSelectModel<typeof item> & {
  locationDetails: InferSelectModel<typeof itemLocation>;
};

export const handleGetItem = async (_: Request, res: Response) => {
  // const itemId = req.params.id;
  try {
    const items = await db.select().from(item).limit(10);
    let itemDetailsWithLocation: ItemDetails[] = [];
    for (const item of items) {
      const locationDetails = (
        await db.query.itemLocation.findMany({
          where: eq(itemLocation.itemId, item.id),
        })
      )[0];
      const details = { ...item, locationDetails: locationDetails };
      itemDetailsWithLocation = [...itemDetailsWithLocation, details];
    }

    return res
      .status(200)
      .json({ success: true, data: itemDetailsWithLocation });
  } catch (error) {
    console.log(error);
    // res.send({ succss: false, message: "Failed to fetch items" });
  }
};

export const handleGetItemById = async (req: Request, res: Response) => {
  const itemId = req.params.id;
  try {
    const itemData = (
      await db.select().from(item).where(eq(item.id, itemId))
    )[0];
    const locationDetails = (
      await db.query.itemLocation.findMany({
        where: eq(itemLocation.itemId, itemData.id),
      })
    )[0] as InferSelectModel<typeof itemLocation>;
    console.log(locationDetails, "locationDetails");

    const itemDetails = { ...itemData, locationDetails: locationDetails };
    console.log(itemDetails, "itemDetails");

    return res.status(200).json({ success: true, data: itemDetails });
  } catch (error) {
    console.log(error);
  }
};

export const handleGetItemByCategory = async (req: Request, res: Response) => {
  const category = req.params.categoryId;
  console.log(category);

  try {
    const items = await db.query.item.findMany({
      with: { itemLocation: true },
      where: eq(item.category, category),
    });
    const locationDetails = await db.query.itemLocation.findMany({
      where: eq(itemLocation.itemId, items[0].id),
    });
    console.log(items);

    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    console.log(error);
  }
};
export const handlePostItem = async (req: Request, res: Response) => {
  const itemData = req.body;
  console.log(itemData);

  try {
    if (req.files) {
      const uploadedPhotos = req.files as Express.Multer.File[];
      console.log(uploadedPhotos);
      if (uploadedPhotos.length === 0) {
        return res
          .status(400)
          .json({ success: false, message: "No image uploaded" });
      }
      let urls: string[] = [];
      for (const photo of uploadedPhotos) {
        const b64 = Buffer.from(photo.buffer as Buffer).toString("base64");
        let dataURI = (("data:" + photo.mimetype) as string) + ";base64," + b64;
        const cldRes: UploadApiResponse = await handleItemImageUpload(dataURI);
        urls.push(cldRes.secure_url);

        console.log(cldRes.secure_url, "test");
      }
      const itemdetails: IItem = {
        title: itemData.title,
        description: itemData.description,
        category: itemData.category,
        rate: itemData.rate,
        rentStart: new Date(itemData.rentStart),
        rentEnd: new Date(itemData.rentEnd),
        pictureUrl: urls,
        initialDeposit: itemData.initialDeposit as number,
        addedBy: req.params.userId,
      };
      const newItem = await db
        .insert(item)
        .values(itemdetails)
        .returning({ id: item.id });
      const locationInfo = JSON.parse(itemData.pickupLocation);
      const locationData = {
        location: locationInfo.location as string,
        latitude: locationInfo.latitude as number,
        longitude: locationInfo.longitude as number,
        itemId: newItem[0].id as string,
      };
      console.log(locationData);
      const insertLocation = await db
        .insert(itemLocation)
        .values(locationData)
        .returning({ id: itemLocation.itemId });
      console.log(insertLocation);

      return res.json({ success: true, data: newItem });
    }
    return res.json({ success: false, message: "Image not found" });
  } catch (error) {
    console.log(error);
  }
};

//to get the catagory list from database
export const handleGetCategory = async (_: Request, res: Response) => {
  try {
    const categories = await db.select().from(category);
    return res.json(categories);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

//to search the item from the item collection with similar keywords in title
export const handleSearch = async (req: Request, res: Response) => {
  const search: string = req.params.search as string;
  console.log(search);

  try {
    const searchedItem = (
      await db.execute(
        sql`select * from item where to_tsvector(description) @@ to_tsquery(${search})`
      )
    ).rows as IItemRes[];
    console.log(searchedItem);

    return res.json({ success: true, data: searchedItem });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to search items" });
  }
};

export const handleRentItem = async (req: Request, res: Response) => {
  const rentDetails = req.body;
  const { userId } = req.params;
  console.log(rentDetails);

  const { item: itemId, rentStart, rentEnd } = rentDetails;
  try {
    const itemData = await db.select().from(item).where(eq(item.id, itemId));
    const itemDetails = itemData[0];
    const rentData = {
      item: itemId,
      rentedBy: userId,
      rentStart: new Date(rentStart),
      rentEnd: new Date(rentEnd),
      rate: itemDetails.rate,
      initialDeposit: itemDetails.initialDeposit as number,
    };
    const rentItem = await db
      .insert(rentals)
      .values(rentData)
      .returning({ id: item.id });
    await db
      .update(item)
      .set({ itemStatus: "inrent" })
      .where(eq(item.id, itemId));
    return res.status(200).json({ success: true, data: "Rented successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, data: "Failed to rent item" });
  }
};
export const handleGetRentedItems = async (req: Request, res: Response) => {
  const { user } = req.params;

  console.log(user, req.params);

  try {
    const rentedItems = await db
      .select()
      .from(rentals)
      .where(eq(rentals.rentedBy, user));
    return res.status(200).json({ success: true, data: rentedItems });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, data: "Failed to fetch rented items" });
  }
};
export const handleRentStatusChange = async (req: Request, res: Response) => {
  const { rentId, rentStatus } = req.body;
  try {
    await db
      .update(rentals)
      .set({ status: rentStatus })
      .where(eq(rentals.id, rentId));
    return res
      .status(200)
      .json({ success: true, data: `Status changed to ${rentStatus}` });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, data: "Failed to change status" });
  }
};
