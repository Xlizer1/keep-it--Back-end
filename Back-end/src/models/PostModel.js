import { Schema, model } from "mongoose";

const postSchema = new Schema({
    title: String,
    desc: String,
    image: String
})

const postModel = model('posts', postSchema)

export default postModel;