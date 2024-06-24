import { Request, Response } from "express";
import { db } from "../db";
import { eq } from "drizzle-orm";
import { item } from "../schema/schema";
import { handleItemImageUpload } from "../helper/handleCloudinaryUpload";
import { UploadApiResponse } from "cloudinary";

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
    if (req.file) {
      const b64 = Buffer.from(req.file?.buffer as Buffer).toString("base64");
      let dataURI =
        (("data:" + req?.file.mimetype) as string) + ";base64," + b64;
      const cldRes: UploadApiResponse = await handleItemImageUpload(dataURI);
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
  } catch (error) {
    console.log(error);
  }
};
