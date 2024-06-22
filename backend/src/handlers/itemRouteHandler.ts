import { Request, Response } from "express";
import { db } from "../db";
import { eq } from "drizzle-orm";
import { item } from "../schema/schema";

export const handleGetItem = async (req: Request, res: Response) => {
  const itemId = req.params.id;
  const itemData = await db.query.item.findFirst({
    where: eq(item.id, itemId),
  });
};
//TODO handle the route to post item data along with picture
export const handlePostItem = async (req: Request, res: Response) => {
  const itemData = req.body;
  console.log(req.body);
  

  res.json(itemData);
};


