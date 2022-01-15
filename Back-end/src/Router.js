import Joi from 'joi'
import { hashPassword } from './Helper/Helper.js'
import jwt from 'jsonwebtoken'
import UserModel from './models/UserModel'
import PostModel from './models/PostModel'

const setupRoutes = (app) => {
   
   app.get('/posts', async(req, res) => {

      try {
         const posts = await PostModel.find({});
         
         return res.json(posts);
         
      } catch (error) {

         res.statusCode = 500;
         console.log(error);
      }

   });

   app.post('/user/register', async (req,res) => {
      const { name, email, password } = req.body;

      const bodySchema = Joi.object({
         name: Joi.string().required(),
         email: Joi.string().email().required(),         
         password: Joi.string().min(6).required()
      });

      const validationResult = await bodySchema.validate(req.body);

      if(validationResult.error){
         res.statusCode = 400;
         res.send(validationResult.error.details[0].message);
         return
      }

      const userExist = await UserModel.findOne({email});

      if(userExist){
         res.statusCode = 400;
      } else {
         res.statusCode = 200;
      }

      try {
         const newUser = new UserModel({
            name,
            email,
            password,
         });

         await newUser.save()
         res.send(newUser);

      } catch (error){
         res.send(error.message);
      }
      
   });

   app.get('*', (req, res) => res.send("URL Not Found"));
   
   app.post('/user/login', async (req, res) => {
      const {email, password} = req.body;
         
      const user = await UserModel.findOne({email});

      if(!user){
         res.statusCode = 401;
         res.send('User Not Found!!!')
      } else {
         if(user.password === hashPassword(password)) {
            const token = jwt.sign({sub: user._id}, user.salt, {expiresIn: 30})
            res.send(token)
         } else {
            res.statusCode = 403;
            res.send('password is wrong')
         }
      }
   });

   app.post('/post/new', async (req,res) => {
      const { title, description } = req.body;

      try {
         const newPost = new PostModel({
            title,
            description,
         });

         await newPost.save();

         res.send(newPost);

      } catch (error){
         res.send(error.message);
      }
   });
}

export default setupRoutes;