const cloudinary = require("../config/cloudinary");
export async function handleItemImageUpload(file: string) {
  const res = await cloudinary.v2.uploader.upload(file, {
    resource_type: "auto",
    folder: "itemimages",
  });
  return res;
}
export async function handleAvatarImageUpload(file: string) {
  const res = await cloudinary.v2.uploader.upload(file, {
    resource_type: "auto",
    folder: "avatarimages",
  });
  return res;
}
