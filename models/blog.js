const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    body: {
        type: String,
        required: true
    },
}, {timestamps: true});

const Blog = mongoose.model("Blog",blogSchema);

module.exports = Blog;