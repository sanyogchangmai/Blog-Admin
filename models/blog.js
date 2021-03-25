const mongoose = require("mongoose");
const marked = require("marked");
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    sanitizedHtml: {
        type: String,
        required: true
      }
}, {timestamps: true});

blogSchema.pre('validate', function(next) {
  
    if (this.body) {
      this.sanitizedHtml = dompurify.sanitize(marked(this.body))
    }
  
    next()
})

const Blog = mongoose.model("Blog",blogSchema);

module.exports = Blog;