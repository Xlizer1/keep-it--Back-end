
import React, { Component } from 'react'
import axios from 'axios'
export default class NoteInput extends Component {
    state={
        newNote:{
            title:"",
            content:"",
            image:[]
        }
    }
    render() {
    const handleChange =(e)=> {
        const {name,value,files} = e.target;
        if (name==="title") {
            this.setState((prev)=>{
                return(
                    {
                        newNote:{
                            ...prev.newNote,
                            title:value
                        }
                    }
                )
            })
        } else if(name==="content") {
            this.setState((prev)=>{
                return(
                    {
                        newNote:{
                            ...prev.newNote,
                            content:value
                        }
                        
                    }
                )
            })
        } else{
            this.setState((prev)=>{
                return(
                    {
                        newNote:{
                            ...prev.newNote,
                            image:files[0]
                        }
                    }
                )
            })
        }
    }
    // ==== Pass the new note to the parent
    const handleAddClick = (e) =>{
        e.preventDefault()
        this.props.updateParent(this.state.newNote);
        // Add note to DB
        const payload = {
            title: this.state.newNote.title,
            content: this.state.newNote.content
        }
        addNote(payload)
        
    }
    // add note to DB
    function addNote(payload){
        axios({
            url:"http://localhost:4000/note/new",
            method: "POST",
            data: payload
        })
        .then(()=>{
            console.log('Note has been sent to the server')
        })
        .catch(()=>{
            console.log("Internel server ERROR !!!");
        })
    }
        return (
            <div className='note-inputs'>
                <form>
                    <input type="text" name="title" value={this.state.newNote.title} id="title" placeholder="Title" onChange={handleChange}/>
                    <textarea rows = "2" cols="23" name = "content" value={this.state.newNote.content} id="note-content" placeholder='Take a note' onChange={handleChange}></textarea>
                    <input type="file" multiple accept="image/*" name="image" onChange={handleChange}/>
                <div className='note-actions'>
                    <button className='img-icon'><i className="far fa-image"></i></button>
                    <button className='add-icon' type="submit" onClick={handleAddClick}><i className="fas fa-plus "></i></button>
                </div>
                </form>
            </div>
        )
    }
}
