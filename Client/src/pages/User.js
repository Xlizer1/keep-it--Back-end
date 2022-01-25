import axios from 'axios'
import React, { Component} from 'react'
import Header from '../components/Header'
import NotesArea from '../components/NotesArea'
import LIST_URI from '../components/LIST_URI'

export default class User extends Component {
    state={
        notes:[],
    }

    componentDidMount() {
        this.dataBase()
    }

    dataBase = () => {

        const token = localStorage.getItem('token')

        axios.get(LIST_URI, {
            headers: {
                Authorization: token
            }
        })
    }
    
    render() {
    //1 - ===== Add new note
    const addNote= (newNote)=> {

        this.setState((prevNote)=>{
            return(
                {
                    notes:[...prevNote.notes,newNote],
                }
            )
        })    
    }

    // 2 ==== Delete a note
        const deleteNote = (noteToDeleteId)=> {
            this.setState((prevNote)=>{
                return({
                    notes:prevNote.notes.filter((note,index)=>{
                        return index!== noteToDeleteId
                    }) 
                })
            })
        }
        return (
            <div className='user'>
                <Header/>
                <NotesArea updateUserParent={addNote} notes={this.state.notes} deleteUpdate={deleteNote}/>
            </div>
        )
    }
}