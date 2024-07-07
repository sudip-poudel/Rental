"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleAvatarImageUpload = exports.handleItemImageUpload = void 0;
const cloudinary = require("../config/cloudinary");
async function handleItemImageUpload(file) {
    const res = await cloudinary.v2.uploader.upload(file, {
        resource_type: "auto",
        folder: "itemimages",
    });
    return res;
}
exports.handleItemImageUpload = handleItemImageUpload;
async function handleAvatarImageUpload(file) {
    const res = await cloudinary.v2.uploader.upload(file, {
        resource_type: "auto",
        folder: "avatarimages",
    });
    return res;
}
exports.handleAvatarImageUpload = handleAvatarImageUpload;
