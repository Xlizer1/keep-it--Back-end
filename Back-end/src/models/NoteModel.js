import { Schema, model } from "mongoose";

const noteSchema = new Schema({
    title: String,
    content: String
})

const NoteModel = model('notes', noteSchema)

export default NoteModel;