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
export const handlePostItem = async (req: Request, res: Response) => {
  const itemData = req.body;
  res.json(itemData);
};