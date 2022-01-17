"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.promise.js");

require("core-js/modules/es.symbol.description.js");

var _joi = _interopRequireDefault(require("joi"));

var _Helper = require("./Helper/Helper.js");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _UserModel = _interopRequireDefault(require("./models/UserModel"));

var _NoteModel = _interopRequireDefault(require("./models/NoteModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const setupRoutes = app => {
  app.get('/notes', async (req, res) => {
    try {
      const notes = await _NoteModel.default.find({});
      return res.json(notes);
    } catch (error) {
      res.statusCode = 500;
      console.log(error);
    }
  });
  app.post('/user/register', async (req, res) => {
    const {
      name,
      email,
      password
    } = req.body;

    const bodySchema = _joi.default.object({
      name: _joi.default.string().required(),
      email: _joi.default.string().email().required(),
      password: _joi.default.string().min(6).required()
    });

    const validationResult = await bodySchema.validate(req.body);

    if (validationResult.error) {
      res.statusCode = 400;
      res.send(validationResult.error.details[0].message);
      return;
    }

    const userExist = await _UserModel.default.findOne({
      email
    });

    if (userExist) {
      res.statusCode = 400;
    } else {
      res.statusCode = 200;
    }

    try {
      const newUser = new _UserModel.default({
        name,
        email,
        password
      });
      await newUser.save();
      res.send(newUser);
    } catch (error) {
      res.send(error.message);
    }
  });
  app.get('*', (req, res) => res.send("URL Not Found"));
  app.post('/user/login', async (req, res) => {
    const {
      email,
      password
    } = req.body;
    const user = await _UserModel.default.findOne({
      email
    });

    if (!user) {
      res.statusCode = 401;
      res.send('User Not Found!!!');
    } else {
      if (user.password === (0, _Helper.hashPassword)(password)) {
        const token = _jsonwebtoken.default.sign({
          sub: user._id
        }, user.salt, {
          expiresIn: 30
        });

        res.send(token);
      } else {
        res.statusCode = 403;
        res.send('password is wrong');
      }
    }
  });
  app.post('/note/new', async (req, res) => {
    const {
      title,
      description
    } = req.body;

    try {
      const newNote = new _NoteModel.default({
        title,
        description
      });
      await newNote.save();
      res.send(newNote);
    } catch (error) {
      res.send(error.message);
    }
  });
};

var _default = setupRoutes;
exports.default = _default;