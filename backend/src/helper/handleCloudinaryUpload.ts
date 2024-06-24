const cloudinary = require("../config/cloudinary");
export async function handleItemImageUpload(file: string) {
  const res = await cloudinary.v2.uploader.upload(file, {
    resource_type: "auto",
    folder: "itemimages",
  });
  return res;
}
