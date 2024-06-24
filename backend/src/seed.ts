import { db } from "./db";
import { category } from "./schema/schema";

export const insertCategory = async () => {
  const data = [
    {
      name: "Vehicles",
    },
    {
      name: "Electronics",
    },
    {
      name: "Home and Garden",
    },
    {
      name: "Professional Equipment",
    },
    {
      name: "Event and Entertainment",
    },
    {
      name: "Specialty Items",
    },
  ];
  const res = await db.insert(category).values({ name: "Others" }).returning();
  console.log(res);
};
export const getcat = async () => {
  const test = await db.select().from(category);
  console.log(test);
};
