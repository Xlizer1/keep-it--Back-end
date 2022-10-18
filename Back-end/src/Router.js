import Joi from 'joi'
import { hashPassword } from './Helper/Helper.js'
import jwt from 'jsonwebtoken'
import UserModel from './models/UserModel'
import PostModel from './models/PostModel'

const setupRoutes = (app) => {

   app.get('/user', async (req, res) => {
      try {

         const token = req.headers.authorization;

         if(!token){
            res.statusCode = 401;
            res.send('You do not have Permisson!!!')
         }

         const decodedToken = jwt.decode(token);

         const user = await UserModel.findById(decodedToken.sub);

         if(!user){
            res.statusCode = 401;
            res.send('You do not have Permisson!!!')
         }
      } catch (error) {
            res.statusCode = 401;
            console.log(error);
      }
      try {
         const posts = await PostModel.find({});
         return res.send(posts);
      } catch (error) {
         res.statusCode = 500;
         console.log(error);
      }
   })

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
            const token = jwt.sign({sub: user._id}, user.salt, {expiresIn: 300000})
            
            res.cookie('Auth', token, {maxAge: 9000, httpOnly: true})
            
            res.send(token)
         } else {
            res.statusCode = 403;
            res.send('password is wrong')
         }
      }
   });

   app.post('/user/new', async (req,res) => {
      const { title, desc, image } = req.body;

      try {
         const newPost = new PostModel({
            title,
            desc,
            image
         });

         await newPost.save();

         res.send('added');

      } catch (error){
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
          const decodedToken = jwt.decode(token);

          const user = await UserModel.findById(decodedToken.sub);

          jwt.verify(token, user.salt);

          if (!user) {
            res.statusCode = 401;
            res.send("You Have No Permisson !!!");
          } else {
            const id = req.params.id;
            const post = await PostModel.findById(id);
            if(!post){
                res.statusCode = 404;
                res.send('post Not Found!!!')
                } else {
                  req.statusCode = 200;
                  res.send(`post ${post.title} deleted`);
                  return PostModel.deleteOne({ _id: id });
                }
          }
        }
      } catch (error) {
        res.send(error.message);
      }
    });

}

export default setupRoutes;