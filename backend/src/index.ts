import { db } from "./db";
import { users } from "./schema/schema";
require("dotenv").config();

const test = async () => {
  await db.insert(users).values({ name: "John Doe" });

  const result = await db.query.users.findFirst();
  console.log(result);
};
test();
