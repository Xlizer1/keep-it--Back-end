
import React, { Component } from 'react'

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
    const handleAddClick = () =>{
        this.props.updateParent(this.state.newNote)
    }
        return (
            <div className='note-inputs'>
                <form>
                    <input type="text" name="title" value={this.state.newNote.title} id="title" placeholder="Title" onChange={handleChange}/>
                    <textarea rows = "2" cols="23" name = "content" value={this.state.newNote.content} id="note-content" placeholder='Take a note' onChange={handleChange}></textarea>
                    <input type="file" multiple accept="image/*" name="image" onChange={handleChange}/>
                </form>
                <div className='note-actions'>
                    <button className='img-icon'><i className="far fa-image"></i></button>
                    <button className='add-icon' onClick={handleAddClick}><i className="fas fa-plus "></i></button>
                </div>
            </div>
        )
    }
}
