import { Schema, model } from "mongoose";

const postSchema = new Schema({
    title: String,
    description: String
})

const postModel = model('posts', postSchema)

export default postModel;