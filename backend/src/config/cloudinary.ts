import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from ".";

const cloudinary = require("cloudinary");

cloudinary.v2.config({
  cloud_name: CLOUDINARY_CLOUD_NAME as string,
  api_key: CLOUDINARY_API_KEY as string,
  api_secret: CLOUDINARY_API_SECRET as string,
  secure: true,
});
module.exports = cloudinary;
