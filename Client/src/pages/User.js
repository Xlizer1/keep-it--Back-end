import React, { Component} from 'react'
import Header from '../components/Header'
import NotesArea from '../components/NotesArea'
import POST_URI from '../components/POST_URI'
import axios from "axios"

export default class User extends Component {
    state={
        notes:[],
    }
    // Get Notes List from the DB:
    componentDidMount = ()=>{
        this.getNotes();
    }
    // Get Notes from the DB
    getNotes = ()=>{
        axios.get('http://localhost:4000/notes')
        .then((response)=>{
            const notesFromDB = response.data;
            this.setState({notes:notesFromDB});
            console.log('Notes are received from the DB ')
            console.log(notesFromDB);
        }).catch(()=>{
            console.log("Error in retrieving Notes from DB")
        })
    }
    //1 - ===== Add new note to the state
    addNewNote = (newNote)=> {
        this.setState((prevNote)=>{
            return(
                {
                    notes:[...prevNote.notes,newNote],
                }
            )
        })    
    }
    // 2 ==== Delete a note
    deleteNote = (noteToDeleteId)=> {
            this.setState((prevNote)=>{
                return({
                    notes:prevNote.notes.filter((note)=>{
                        return note._id!== noteToDeleteId
                    }) 
                })
            })
            axios.delete(`http://localhost:4000/notes/${noteToDeleteId}`)
            .then(()=>console.log("Note is succefully deleted"))
            .catch(()=> console.log("Erron Deleting Note"));
        }
    render() {
        
        
        return (
            <div className='user'>
                <Header/>
                <NotesArea updateUserParent={this.addNewNote} notes={this.state.notes} deleteUpdate={this.deleteNote}/>
            </div>
        )
    }
}