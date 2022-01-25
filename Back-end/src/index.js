import express from 'express';
import mongoose from 'mongoose';
import setupRoutes from './Router';
import cors from 'cors'
import cookieParser from 'cookie-parser'

const start = async () => {

   try {
      await mongoose.connect('mongodb://127.0.0.1:27017/KEEP-IT', {
      useNewUrlParser: true,
      useUnifiedTopology: true
      });

      const app = express();

      app.use(cookieParser());

      app.use(express.json());

      console.log("connected to the DB");

      app.use(express.urlencoded({extended: false}));

      app.use(cors());

      console.log("app is created, lets setup routes");
      setupRoutes(app);

      console.log("App routes added, lets listen on port 4000");
      app.listen(4000);
   }
   
   catch (error) {
      console.error(error);
   }
}

start();