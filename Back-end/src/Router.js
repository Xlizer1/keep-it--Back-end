import Joi from 'joi'
import { hashPassword } from './Helper/Helper.js'
import jwt from 'jsonwebtoken'
import UserModel from './models/UserModel'
import NoteModel from './models/NoteModel'
import cors from "cors"

const setupRoutes = (app) => {
   app.use(cors(
      { origin: '*' ,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type']}))
   // GET NOTES
   app.get('/notes', async(req, res) => {

      try {
         const notes = await NoteModel.find({});
         
         return res.json(notes);
         
      } catch (error) {

         res.statusCode = 500;
         console.log(error);
      }

   });
   // REGISTER NEW USER
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
   // LOGIN USER
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
   // ADD NEW NOTE
   app.post('/note/new', async (req,res) => {
      const { title, content } = req.body;

      try {
         const newNote = new NoteModel({
            title,
            content,
         });

         await newNote.save();

         res.send(newNote);

      } catch (error){
         res.send(error.message);
      }
   });
   // DELETE NOTE
   app.delete("/notes/:id",async(req,res)=>{
      const {id} = req.params;
      const noteToDelete = await NoteModel.findById(id);
      if (!noteToDelete) {
         res.send("NOTE NOT FOUND");
         return
      }
      try {
         await NoteModel.deleteOne({'_id':id});
         res.send('Note is Deleted')
      } catch (error) {
         res.send(error.message);
         console.log("Erron deleting note");
      }
   })
}

export default setupRoutes;