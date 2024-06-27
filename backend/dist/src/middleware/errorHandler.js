"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const express = require("express");
const app = express();
// class of custom error
class MyCustomError extends Error {
    constructor(message) {
        super(message);
        this.name = "MyCustomError";
    }
}
// Error handler function
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    if (err instanceof MyCustomError) {
        return res.status(500).json({
            error: "Custom Error: Something went wrong",
        });
    }
    else if (err instanceof TypeError) {
        return res.status(400).json({ error: "Type Error: Bad request" });
    }
    else {
        // res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.errorHandler = errorHandler;
