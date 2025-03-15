"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogModel = void 0;
const mongoose_1 = require("mongoose");
const blogSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    isPublished: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});
exports.BlogModel = (0, mongoose_1.model)('Blogs', blogSchema);
