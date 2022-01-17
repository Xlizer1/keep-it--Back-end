"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

const noteSchema = new _mongoose.Schema({
  title: String,
  description: String
});
const noteModel = (0, _mongoose.model)('notes', noteSchema);
var _default = noteModel;
exports.default = _default;