"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _Helper = require("./Helper/Helper.js");

var _shortid = _interopRequireDefault(require("shortid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  Schema,
  model
} = _mongoose.default;
const UserSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
  salt: String
});
UserSchema.pre('save', function (next) {
  if (!this.salt) {
    this.salt = _shortid.default.generate();
  }

  if (this.password) {
    this.password = (0, _Helper.hashPassword)(this.password);
  }

  next();
});
module.exports = model('user', UserSchema);