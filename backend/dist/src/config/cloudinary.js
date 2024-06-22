"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const cloudinary = require("cloudinary");
cloudinary.v2.config({
    cloud_name: _1.CLOUDINARY_CLOUD_NAME,
    api_key: _1.CLOUDINARY_API_KEY,
    api_secret: _1.CLOUDINARY_API_SECRET,
    secure: true,
});
module.exports = cloudinary;
