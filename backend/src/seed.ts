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
  const res = await db.insert(category).values(data).returning();
  console.log(res);
};
