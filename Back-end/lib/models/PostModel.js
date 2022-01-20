"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

const postSchema = new _mongoose.Schema({
  title: String,
  description: String
});
const postModel = (0, _mongoose.model)('posts', postSchema);
var _default = postModel;
exports.default = _default;