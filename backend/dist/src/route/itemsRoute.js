"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const itemRouteHandler_1 = require("../handlers/itemRouteHandler");
const validateToken_1 = __importDefault(require("../middleware/validateToken"));
const express = require("express");
const router = express.Router();
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
router.post("/additem", validateToken_1.default, upload.array("photos", 5), itemRouteHandler_1.handlePostItem);
router.get("/getcategory", validateToken_1.default, itemRouteHandler_1.handleGetCategory);
router.get("/id/:id", validateToken_1.default, itemRouteHandler_1.handleGetItem);
router.get("/search/:search", validateToken_1.default, itemRouteHandler_1.handleSearch);
router.get("/item", validateToken_1.default, itemRouteHandler_1.handleGetItem);
router.post("/rentitem", validateToken_1.default, itemRouteHandler_1.handleRentItem);
module.exports = router;
