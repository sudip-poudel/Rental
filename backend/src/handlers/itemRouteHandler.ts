import { Request, Response } from "express";
import { db } from "../db";
import { eq } from "drizzle-orm";
import { category, item, itemLocation } from "../schema/schema";
import { handleItemImageUpload } from "../helper/handleCloudinaryUpload";
import { UploadApiResponse } from "cloudinary";
import { IItem } from "../types/types";

export const handleGetItem = async (req: Request, res: Response) => {
  const itemId = req.params.id;
  const itemData = await db.query.item.findFirst({
    where: eq(item.id, itemId),
  });
};
//TODO handle the route to post item data along with picture
export const handlePostItem = async (req: Request, res: Response) => {
  const itemData = req.body;

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
      //TODO remove 90 and add initial deposit in the form
      const itemdetails: IItem = {
        title: itemData.title,
        description: itemData.description,
        category: itemData.category,
        rate: itemData.rate,
        pictureUrl: urls,
        initialDeposit: itemData.initialDeposit || 90,
        addedBy: req.params.userId,
      };
      //TODO handle category first then handle this
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
export const handleGetCategory = async (_: Request, res: Response) => {
  try {
    const categories = await db.select().from(category);
    return res.json(categories);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

export const handleSearch = async (req: Request, res: Response) => {
  const search = req.params.search.toLowerCase();
  try {
    const searchedItem = await db
      .select()
      .from(item)
      .where(eq(item.title, search));
    return res.json(searchedItem);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to search items" });
  }
};
