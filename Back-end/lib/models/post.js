"use strict";

var _mongoose = require("mongoose");

const postSchema = new _mongoose.Schema({
  title: String,
  description: String
});
module.exports = (0, _mongoose.model)('posts', postSchema);