"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const itemRouteHandler_1 = require("../handlers/itemRouteHandler");
const validateToken_1 = __importDefault(require("../middleware/validateToken"));
const express = require("express");
const router = express.Router();
router.get("/:id", validateToken_1.default, itemRouteHandler_1.handleGetItem);
router.post("/additem", itemRouteHandler_1.handlePostItem);
module.exports = router;
