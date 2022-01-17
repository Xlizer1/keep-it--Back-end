"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

const noteSchema = new _mongoose.Schema({
  title: String,
  content: String
});
const NoteModel = (0, _mongoose.model)('notes', noteSchema);
var _default = NoteModel;
exports.default = _default;