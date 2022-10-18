"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.promise.js");

var _joi = _interopRequireDefault(require("joi"));

var _Helper = require("./Helper/Helper.js");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _UserModel = _interopRequireDefault(require("./models/UserModel"));

var _PostModel = _interopRequireDefault(require("./models/PostModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const setupRoutes = app => {
  app.get('/user', async (req, res) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        res.statusCode = 401;
        res.send('You do not have Permisson!!!');
      }

      const decodedToken = _jsonwebtoken.default.decode(token);

      const user = await _UserModel.default.findById(decodedToken.sub);

      if (!user) {
        res.statusCode = 401;
        res.send('You do not have Permisson!!!');
      }
    } catch (error) {
      res.statusCode = 401;
      console.log(error);
    }

    try {
      const posts = await _PostModel.default.find({});
      return res.send(posts);
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
          expiresIn: 300000
        });

        res.cookie('Auth', token, {
          maxAge: 9000,
          httpOnly: true
        });
        res.send(token);
      } else {
        res.statusCode = 403;
        res.send('password is wrong');
      }
    }
  });
  app.post('/user/new', async (req, res) => {
    const {
      title,
      desc,
      image
    } = req.body;

    try {
      const newPost = new _PostModel.default({
        title,
        desc,
        image
      });
      await newPost.save();
      res.send('added');
    } catch (error) {
      res.send(error.message);
    }
  });
  app.delete("/post/delete/:id", async (req, res) => {
    const token = req.headers.authorization;

    try {
      if (!token) {
        res.statusCode = 401;
        res.send("You Have No Permisson !!!");
      } else {
        const decodedToken = _jsonwebtoken.default.decode(token);

        const user = await _UserModel.default.findById(decodedToken.sub);

        _jsonwebtoken.default.verify(token, user.salt);

        if (!user) {
          res.statusCode = 401;
          res.send("You Have No Permisson !!!");
        } else {
          const id = req.params.id;
          const post = await _PostModel.default.findById(id);

          if (!post) {
            res.statusCode = 404;
            res.send('post Not Found!!!');
          } else {
            req.statusCode = 200;
            res.send("post ".concat(post.title, " deleted"));
            return _PostModel.default.deleteOne({
              _id: id
            });
          }
        }
      }
    } catch (error) {
      res.send(error.message);
    }
  });
};

var _default = setupRoutes;
exports.default = _default;